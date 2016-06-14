const ReactInjection = require('react/lib/ReactInjection');
const ReactComponentEnvironment = require('react/lib/ReactComponentEnvironment');

const ReactLibUIReconcileTransaction = require('./ReactLibUIReconcileTransaction');
const ReactLibUIComponent = require('./ReactLibUIComponent');
const ReactLibUIIDOperations = require('./ReactLibUIIDOperations');

// inspired by https://github.com/Yomguithereal/react-blessed/blob/master/src/ReactBlessedInjection.js
module.exports.inject = function inject() {
//    ReactInjection.NativeComponent.injectGenericComponentClass(ReactLibUIComponent);

    ReactInjection.Updates.injectReconcileTransaction(ReactLibUIReconcileTransaction);

    ReactInjection.EmptyComponent.injectEmptyComponent('element');

    ReactComponentEnvironment.processChildrenUpdates = ReactLibUIIDOperations.dangerouslyProcessChildrenUpdates.bind(ReactLibUIIDOperations);
    ReactComponentEnvironment.replaceNodeWithMarkupByID = ReactLibUIIDOperations.dangerouslyReplaceNodeWithMarkupByID.bind(ReactLibUIIDOperations);
};

