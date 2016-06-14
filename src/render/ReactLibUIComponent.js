const ReactLibUIIDOperations = require('./ReactLibUIIDOperations');
const ReactMultiChild = require('react/lib/ReactMultiChild');

class ReactLibUIComponent {
    constructor(tag) {
        this._tag = tag;
        this._updating = false;
        this._renderedChildren = null;
        this._previousStyle = null;
        this._previousStyleCopy = null;
        this._rootNodeId = null
        this._wrapperState = null;
        this._topLevelWrapper = null;
        this._nodeWithLegacyProperties = null;
    }

    construct(element) {
        this._currentElement = element;
    }

    mountComponent(rootId, transaction, context) {
        this._rootNodeId = rootId;

        const node = this.mountNode(ReactLibUIIDOperations.getParent(rootId), this._currentElement);

        ReactLibUIIDOperations.add(rootId, node);

        let childrenToUse = this._currentElement.props.children;
        childrenToUse = childrenToUse === null ? [] : [].concat(childrenToUse);

        if (childrenToUse.length > 0) {
            const content = childrenToUse.map(child => typeof child === 'string' || typeof child === 'number');
            const realChildren = childrenToUse.map(child => content.indexOf(child) === -1);

            if (content) {
                //node.setContent(content.join(''));
            }

            this.mountChildren(realChildren, transaction, context);
        }

        ReactLibUIIDOperations.window.render();
    }

    mountNode(parent, element) {
        console.log('need to mount', element, 'to', parent);

        return {weNeedToMount: element};
    }

    receiveComponent(nextElement, transaction, context) {
        console.log('need to update', nextElement);
    }

    unmountComponent() {
        this.unmountChildren();

        const node = ReactLibUIIDOperations.get(this._rootNodeId);

        node.destroy();

        ReactLibUIIDOperations.drop(this._rootNodeId);

        this._rootNodeId = null;

        ReactLibUIIDOperations.window.render(0);
    }

    getPublicInstance() {
        return ReactLibUIIDOperations.get(this._rootNodeId);
    }
}

Object.assign(ReactLibUIComponent.prototype, ReactMultiChild.Mixin);

module.exports = ReactLibUIComponent;

