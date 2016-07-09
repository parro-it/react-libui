import * as libui from 'libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';
import ReactMultiChild from 'react/lib/ReactMultiChild';

export class HorizontalBox {
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
        this.node = new libui.UiHorizontalBox();
        ReactLibUIIDOperations.add(rootID, this.node, props);
        this.updateProps({}, props);

        this.mountChildren(props.children, transaction, context).map(child => this.mountChild(child, props));
        return this.node;
    }

    receiveComponent(nextComponent, transaction, context) {
        const props = nextComponent.props;
        const oldProps = this._currentElement.props;
        this.updateProps(oldProps, props);
        this.updateChildren(props.children, transaction, context);
        this._currentElement = nextComponent;
    }

    mountChild(child, props) {
        this.node.append(child, props.stretch);
    }

    unmountComponent() {
        this.node.close();
        this.unmountChildren();

        ReactLibUIIDOperations.drop(this._rootNodeID, this.node);
    }

    updateProps(oldProps, props) {
        this.node.setPadded(props.padded || true);
    }
}
Object.assign(HorizontalBox.prototype, ReactMultiChild.Mixin);
