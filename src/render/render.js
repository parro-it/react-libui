const invariant = require('invariant');
const ReactElement = require('react/lib/ReactElement');
const ReactInstanceHandles = require('react/lib/ReactInstanceHandles');
const ReactLibUIIDOperations = require('./ReactLibUIIDOperations');
const ReactUpdates = require('react/lib/ReactUpdates');
const instantiateReactComponent = require('react/lib/instantiateReactComponent');

require('./ReactLibUIInject').inject();

// inspired by https://github.com/Yomguithereal/react-blessed/blob/master/src/render.js
function render(element) {
    if (!ReactElement.isValidElement(element)) {
        throw new Error('Invalid React Element');
    }

    // create our root id
    const id = ReactInstanceHandles.createReactRootID();
    // create our component
    const component = instantiateReactComponent(element);

    //ReactLibUIIDOperations.setWindow(window);

    ReactUpdates.batchedUpdates(() => {
        const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
        transaction.perform(() => component.mountComponent(id, transaction, {}));
        ReactUpdates.ReactReconcileTransaction.release(transaction);
    });

    return component._instance;
}

module.exports = {
    render: render
};
