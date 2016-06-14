const React = require('react');

class ComboboxItem {
    constructor(element) {
        this._currentElement = element;
        this._rootNodeID = null;
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
        this.node = props.children || '(Empty)';

        return {
            text: this.node
        };
    }

    receiveComponent(nextComponent, transaction, context) {
        this._currentElement = nextComponent;
        const props = this._currentElement.props;
        this.node = props.childen || '(Empty)';

        return {
            text: this.node
        };
    }

    unmountComponent() {
    }
}

// todo proptypes checking

module.exports = ComboboxItem;
