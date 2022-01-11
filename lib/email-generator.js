'use strict';

class Email {
  constructor(payload) {
    this.customerName = payload.order.customerName,
    this.orderID = payload.order.orderID,
    this.email = `Thank you ${this.customerName}! Your requested vaccine shipment of order ${this.orderID} has been delivered to ${payload.order.address}.`
  }
}

module.exports = Email;