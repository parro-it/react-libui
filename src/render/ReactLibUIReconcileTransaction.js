const CallbackQueue = require('react/lib/CallbackQueue');
const PooledClass = require('react/lib/PooledClass');
const Transaction = require('react/lib/Transaction');

const ON_READY_QUEUEING = {
    initialize: function() {
        return this.reactMountReady.reset()
    },
    close: function() {
        this.reactMountReady.notifyAll()
    }
};

function ReactLibUIReconcileTransaction() {
    this.reinitializeTransaction();
    this.reactMountReady = CallbackQueue.getPooled(null);
}

const Mixin = {
    getTransactionWrappers: function() {
        return [ON_READY_QUEUEING]
    },
    getReactMountReady: function() {
        return this.reactMountReady
    },
    destructor: function() {
        CallbackQueue.release(this.reactMountReady);
        this.reactMountReady = null;
    }
};

Object.assign(ReactLibUIReconcileTransaction.prototype, Transaction.Mixin, Mixin);

PooledClass.addPoolingTo(ReactLibUIReconcileTransaction);

module.exports = ReactLibUIReconcileTransaction;
