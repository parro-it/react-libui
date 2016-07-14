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
        this.node.setPadded(true); // default is true
        ReactLibUIIDOperations.add(rootID, this.node, props);
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
        this.node.append(child, ReactLibUIIDOperations.getStretchy(child));
    }

    unmountComponent() {
        this.node.close();
        this.unmountChildren();

        ReactLibUIIDOperations.drop(this._rootNodeID, this.node);
    }

    updateProps(oldProps, props) {
        if (isPadded(oldProps) !== isPadded(props)) {
            this.node.setPadded(isPadded(props));
        }
    }
}
Object.assign(HorizontalBox.prototype, ReactMultiChild.Mixin);

// if nothing is passed, then it's true
function isPadded(props) {
    return props.padded !== false;

}
