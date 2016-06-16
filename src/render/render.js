import ReactElement from 'react/lib/ReactElement';
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactUpdates from 'react/lib/ReactUpdates';
import instantiateReactComponent from 'react/lib/instantiateReactComponent';

import { inject } from './ReactLibUIInject';
inject();

// inspired by https://github.com/Yomguithereal/react-blessed/blob/master/src/render.js
export function render(element) {
    if (!ReactElement.isValidElement(element)) {
        throw new Error('Invalid React Element');
    }

    // create our root id
    const id = ReactInstanceHandles.createReactRootID();
    // create our component
    const component = instantiateReactComponent(element);

    ReactUpdates.batchedUpdates(() => {
        const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
        transaction.perform(() => component.mountComponent(id, transaction, {}));
        ReactUpdates.ReactReconcileTransaction.release(transaction);
    });

    return component._instance;
}
