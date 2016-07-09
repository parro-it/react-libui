import * as libui from 'libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';
import ReactMultiChild from 'react/lib/ReactMultiChild';

export class Group {
    constructor(element) {
        this.node = null;
        this._currentElement = element;
        this._renderedChildren = null;
        this._rootNodeID = null;
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
        this.node = new libui.UiGroup();
        ReactLibUIIDOperations.add(rootID, this.node);
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

    mountChild(child) {
        this.node.setChild(child);
    }

    unmountComponent() {
        this.unmountChildren();
        this.node.setChild(null);
        ReactLibUIIDOperations.drop(this._rootNodeID);
    }

    updateProps(oldProps, props) {
        this.node.title = props.title;
        this.node.margined = props.margined || true;
    }
}
Object.assign(Group.prototype, ReactMultiChild.Mixin);
