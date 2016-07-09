import * as libui from 'libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';
import ReactMultiChild from 'react/lib/ReactMultiChild';

export class Tab {
    constructor(element) {
        this._currentElement = element;
        this._rootNodeID = null;
        this._renderedChildren = null;
        this.node = null;
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

    mountComponent(rootID, transaction, context) {
        this._rootNodeID = rootID;
        const props = this._currentElement.props;
        const mounted = this.mountChildren(props.children, transaction, context);
        this.node = {
            title: props.title,
            margined: props.margined,
            node: mounted.length ? mounted[0] : null
        };

        return this.node;
    }

    receiveComponent(nextComponent, transaction, context) {
        this._currentElement = nextComponent;
        const props = this._currentElement.props;
        this.updateChildren(props.children, transaction, context);
        this.node.title = props.title;
        this.node.margined = props.margined;

        return this.node;
    }

    unmountComponent() {
        this.unmountChildren();
    }
}
Object.assign(Tab.prototype, ReactMultiChild.Mixin);
