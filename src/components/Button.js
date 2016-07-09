import * as libui from 'libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';

export class Button {
    constructor(element) {
        this.node = null;
        this._currentElement = element;
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
        this.node = new libui.UiButton();
        ReactLibUIIDOperations.add(rootID, this.node, props);
        this.updateProps({}, props);

        return this.node;
    }

    receiveComponent(nextComponent, transaction, context) {
        const props = nextComponent.props;
        const oldProps = this._currentElement.props;
        this.updateProps(oldProps, props);
        this._currentElement = nextComponent;
    }

    unmountComponent() {
        ReactLibUIIDOperations.drop(this._rootNodeID);
    }

    updateProps(oldProps, props) {
        if (props.children !== oldProps.children) {
            const text = typeof props.children === 'string' ? props.children : props.children.join('');
            if (text !== this.node.getText()) {
                this.node.setText(text);
            }
        }
        if (props.onClicked) {
            this.node.onClicked(props.onClicked);
        }
    }
}
