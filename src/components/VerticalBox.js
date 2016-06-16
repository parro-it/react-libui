import libui from '../../libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';
import ReactMultiChild from 'react/lib/ReactMultiChild';

export class VerticalBox {
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
        this.node = new libui.UiVerticalBox();
        ReactLibUIIDOperations.add(rootID, this.node, props);
        this.updateProps({}, props);

        this.mountChildren(props.children, transaction, context).map((child, index) => this.mountChild(child, props, index));
        return this.node;
    }

    receiveComponent(nextComponent, transaction, context) {
        const props = nextComponent.props;
        const oldProps = this._currentElement.props;
        this.updateProps(oldProps, props);
        this.updateChildren(props.children, transaction, context);
        this._currentElement = nextComponent;
    }

    mountChild(child, props, index) {
        this.node.append(child, props.stretch);
    }

    unmountComponent() {
        this.unmountChildren().map((child, index) => this.unmountChild(child, index));
        this.node._unmount();
    }

    unmountChild(child, index) {
        this.node.deleteAt(index);
    }

    updateProps(oldProps, props) {
        this.node.setPadded(props.padded || true);
    }
}
Object.assign(VerticalBox.prototype, ReactMultiChild.Mixin);
