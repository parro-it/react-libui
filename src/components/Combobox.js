import * as libui from 'libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';
import ReactMultiChild from 'react/lib/ReactMultiChild';

export class Combobox {
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
        this.node = new libui.UiCombobox();
        ReactLibUIIDOperations.add(rootID, this.node, props);
        this.updateProps({}, props);

        this.mountChildren(props.children, transaction, context).map((child, index) => this.mountChild(child, index));
        return this.node;
    }

    mountChild(child, index) {
        this.node.append(child.text);
    }

    receiveComponent(nextComponent, transaction, context) {
        const props = nextComponent.props;
        const oldProps = this._currentElement.props;
        this.updateProps(oldProps, props);
        this.updateChildren(props.children, transaction, context);
        this._currentElement = nextComponent;
    }

    unmountComponent() {
        this.unmountChildren();

        ReactLibUIIDOperations.drop(this._rootNodeID);
    }

    updateProps(oldProps, props) {
        if (props.selected !== undefined && props.selected !== oldProps.selected) {
            setImmediate(() => this.node.setSelected(props.selected)); // another component that doesn't like being updated asap
        }
        if (props.onSelected) {
            this.node.onSelected(() => props.onSelected(this.node.getSelected()));
        }
    }
}
Object.assign(Combobox.prototype, ReactMultiChild.Mixin);

import { Item } from './ComboboxItem';
Combobox.Item = Item;
