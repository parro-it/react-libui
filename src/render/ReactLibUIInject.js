import ReactInjection from 'react/lib/ReactInjection';
import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';

import ReactLibUIReconcileTransaction from './ReactLibUIReconcileTransaction';
import ReactLibUIIDOperations from './ReactLibUIIDOperations';

// inspired by https://github.com/Yomguithereal/react-blessed/blob/master/src/ReactBlessedInjection.js
export function inject() {
    //    ReactInjection.NativeComponent.injectGenericComponentClass(ReactLibUIComponent);

    ReactInjection.Updates.injectReconcileTransaction(ReactLibUIReconcileTransaction);

    ReactInjection.EmptyComponent.injectEmptyComponent('element');

    ReactComponentEnvironment.processChildrenUpdates = ReactLibUIIDOperations.dangerouslyProcessChildrenUpdates.bind(ReactLibUIIDOperations);
    ReactComponentEnvironment.replaceNodeWithMarkupByID = ReactLibUIIDOperations.dangerouslyReplaceNodeWithMarkupByID.bind(ReactLibUIIDOperations);
}
