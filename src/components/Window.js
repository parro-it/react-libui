import * as libui from 'libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';
import ReactMultiChild from 'react/lib/ReactMultiChild';


const WindowDummy = {
    alert: function(title, message) {
        if (arguments.length === 1) {
            message = title;
            title = 'Alert';
        }
        libui.UiDialogs.msgBox(this, title, message);
    },
    error: function(title, message) {
        if (arguments.length === 0) {
            title = message = '';
        }
        if (arguments.length === 1) {
            message = title;
            title = 'Alert';
        }
        libui.UiDialogs.msgBoxError(this, title, message);
    },
    openFile: function() {
        return libui.UiDialogs.openFile(this);
    },
    saveFile: function() {
        return libui.UiDialogs.saveFile(this);
    }
};
Object.assign(libui.UiWindow.prototype, WindowDummy);

export class Window {
    constructor(element) {
        this.node = null;
        this._currentElement = element;
        this._renderedChildren = null;
        this._rootNodeID = null
    }

    construct(element) {
        this._currentElement = element;
    }

    getNativeNode() {
        return this.node;
    }

    getPublicInstance() {
        return this.node;
    }

    mountComponent(rootID, transaction, nativeParent, context) {
        this._rootNodeID = rootID;

        const props = this._currentElement.props;
        this.node = new libui.UiWindow(props.title || 'Empty Title', props.width || 500, props.height || 500, props.menu || false);
        ReactLibUIIDOperations.add(rootID, this.node);
        this.node.show();

        this.updateProps({}, props);

        this.mountChildren(props.children, transaction, context).map(child => this.mountChild(child));
        return this.node;
    }

    receiveComponent(nextComponent, transaction, context) {
        const props = nextComponent.props;
        const oldProps = this._currentElement.props;

        this.updateProps(oldProps, props);

        this.updateChildren(props.children, transaction, context);
        this._currentElement = nextComponent;
    }

    unmountComponent() {
        this.node.close();
        this.unmountChildren();
    }

    mountChild(child) {
        this.node.setChild(child);
    }

    updateProps(oldProps, props) {
        if (props.title !== oldProps.title) {
            this.node.title = props.title;
        }
        if (props.margined !== oldProps.margined) {
            this.node.margined = props.margined;
        }
        const position = this.node.position;
        let changedPosition = false;
        let newX = position.x;
        let newY = position.y;
        if (oldProps.x !== props.x) {
            newX = props.x;
            changedPosition = true;
        }
        if (oldProps.y !== props.y) {
            newY = props.y;
            changedPosition = true;
        }
        if (changedPosition && (newX !== position.x || newY !== position.y)) {
            setImmediate(() => this.node.position = new libui.Point(newX, newY));
        }
        if (props.onClosing) {
            this.node.onClosing(props.onClosing);
        }
        if (props.onPositionChanged) {
            this.node.onPositionChanged(() => props.onPositionChanged(this.node.position.x, this.node.position.y));
        }
    }
    
}
Object.assign(Window.prototype, ReactMultiChild.Mixin);