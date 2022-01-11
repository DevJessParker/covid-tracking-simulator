'use strict';

const io = require('socket.io-client');
const server = io.connect('http://localhost:3000/hub');

const faker = require('faker');
const Center = require('../lib/center-generator.js');
let centerNUM = 1000;


setInterval(async () => {
  const center = await new Center(centerNUM, server);
  centerNUM++
  let orderDetails = {
    date: Date.now(),
    order: {
      centerNumber: `${center.centerNUM}`,
      orderedOn: Date.now(),
      orderID: faker.datatype.uuid(),
      customerName: `Dr. ${faker.name.findName()}`,
      address: faker.address.streetAddress()
    }
  }
  server.emit('join-room', center);
  server.emit('order-received', orderDetails);
  console.log(orderDetails);
}, 5000);

server.on('order-received', (payload) => {
  server.emit('vaccine-requested', payload);
  console.log(`CRISIS CENTER: Vaccine order ${payload.order.orderID} has been RECEIVED`)
})

server.on('delivery-confirmed', (payload) => {
  console.log('CRISIS CENTER: Vaccine delivery confirmed', payload)
  server.emit('send-email', payload);
})

