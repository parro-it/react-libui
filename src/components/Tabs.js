import libui from 'libui-node';
import ReactLibUIIDOperations from '../render/ReactLibUIIDOperations';
import ReactMultiChild from 'react/lib/ReactMultiChild';

export class Tabs {
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
        this.node = new libui.UiTab();
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
        this.node.append(child.title, child.node);
        if (child.margined) {
            this.node.setMargined(index, child.margined);
        }
    }

    unmountComponent() {
        this.unmountChildren().map((child, index) => this.unmountChild(child, index));
    }

    unmountChild(child, index) {
        this.node.deleteAt(index);
    }

    updateProps(oldProps, props) {
    }
}
Object.assign(Tabs.prototype, ReactMultiChild.Mixin);

import { Tab } from './Tab';
Tabs.Tab = Tab;
