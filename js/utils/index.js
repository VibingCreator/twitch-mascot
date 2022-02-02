const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Queue {
    enqueue = (fn) => {
        if (!this.promise) {
            this.promise = fn();
        } else {
            this.promise = this.promise.then(fn);
        }
    };
}

const queue = new Queue();

export { queue as default };