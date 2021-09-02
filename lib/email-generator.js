'use strict';

class Email {
  constructor(payload) {
    this.customerName = payload.order.customerName,
    this.orderID = payload.order.orderID,
    this.email = `Thank you ${this.customerName}! Order ${this.orderID} has been delivered.`
  }
}

module.exports = Email;