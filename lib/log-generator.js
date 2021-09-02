'use strict';

class Log {
  constructor(event, payload) {
    this.event = event
    this.timestamp = Date.now();
    this.payload = payload.order
  }
}

module.exports = Log