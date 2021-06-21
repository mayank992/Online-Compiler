const EventEmitter = require('events');

class TaskQueue extends EventEmitter {
  _queue = [];
  _limit = 0;
  _queueSize = 0;
  _tasksRunning = 0;

  constructor({ limit }) {
    super();
    this._limit = limit;
  }

  incrementQueueSize() {
    this._queueSize++;
    this.emit('next');
  }

  decrementQueueSize() {
    if (this._queueSize === 0) {
      throw new Error('task queue is empty');
    }

    this._queueSize--;
  }

  incrementTasksRunning() {
    this._tasksRunning++;
  }

  decrementTasksRunning() {
    if (this._tasksRunning === 0) {
      throw new Error('no any task Running.');
    }

    this._tasksRunning--;
    this.emit('next');
  }

  addTask(taskData) {
    const task = new Promise((resolve, reject) => {
      this._queue.push({ resolve, reject, taskData });
    });

    this.incrementQueueSize();
    return task;
  }

  getTask() {
    if (this._queueSize === 0) {
      return 'underflow';
    }

    if (this._tasksRunning < this._limit) {
      const task = this._queue.shift();
      this.decrementQueueSize();
      return task;
    }

    return 'limit reached';
  }
}

module.exports = TaskQueue;
