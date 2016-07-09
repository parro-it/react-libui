import libui from 'libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';
import ReactMultiChild from 'react/lib/ReactMultiChild';

export class RadioButtons {
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
        this.node = new libui.UiRadioButtons();
        ReactLibUIIDOperations.add(rootID, this.node, props);
        this.mountChildren(props.children, transaction, context).map(child => this.mountChild(child));

        this.updateProps({}, props);

        return this.node;
    }

    mountChild(child) {
        this.node.append(child.text);
    }

    receiveComponent(nextComponent, transaction, context) {
        const props = nextComponent.props;
        const oldProps = this._currentElement.props;
        this.updateChildren(props.children, transaction, context);
        this.updateProps(oldProps, props);
        this._currentElement = nextComponent;
    }

    unmountComponent() {
        this.unmountChildren();
        ReactLibUIIDOperations.drop(this._rootNodeID);
    }

    updateProps(oldProps, props) {
        if (props.selected !== oldProps.selected && typeof props.selected === 'number') {
            this.node.setSelected(props.selected);
        }
        if (props.onSelected) {
            this.node.onSelected(() => props.onSelected(this.node.getSelected()));
        }
    }
}
Object.assign(RadioButtons.prototype, ReactMultiChild.Mixin);

import { Item } from './ComboboxItem';
RadioButtons.Item = Item;
