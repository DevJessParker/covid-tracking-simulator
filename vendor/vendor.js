'use strict';

const io = require('socket.io-client');
const server = io.connect('http://localhost:3000/hub');

const faker = require('faker');
const Store = require('../lib/store-generator.js');
let storeNUM = 1000;


setInterval(async () => {
  const store = await new Store(storeNUM, server);
  storeNUM++
  let orderDetails = {
    date: Date.now(),
    order: {
      storeNumber: `${store.storeNUM}`,
      orderedOn: Date.now(),
      orderID: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress()
    }
  }
  server.emit('join-room', store);
  server.emit('order-received', orderDetails);
  console.log(orderDetails);
}, 5000);

server.on('order-received', (payload) => {
  server.emit('pickup-scheduled', payload);
  console.log(`VENDOR: Order ${payload.order.orderID} has been RECEIVED`)
})

server.on('delivery-confirmed', (payload) => {
  console.log('VENDOR: delivery confirmed', payload)
  server.emit('send email', payload);
})

