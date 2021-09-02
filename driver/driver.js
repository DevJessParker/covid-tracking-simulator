'use strict';

const io = require('socket.io-client');
const server = io.connect('http://localhost:3000/hub');

server.on('pickup-scheduled', (payload) => {
  const delayVar = (Math.ceil(Math.random() * 10))
  setTimeout(() => {
    if (delayVar > 5) {
      server.emit('in-transit', payload);
      console.log(`DRIVER: Order ${payload.order.orderID} is now IN TRANSIT`)
    } else if (delayVar > 3 && delayVar <= 5) {
      server.emit('delayed', payload)
      console.log(`DRIVER: Order ${payload.order.orderID} is now DELAYED`)
    } else if (delayVar > 0 && delayVar <= 3) {
      server.emit('returned-to-vendor', payload)
      console.log(`DRIVER: Order ${payload.order.orderID} has been RETURNED TO VENDOR`)
    }
  }, 1000)
})

server.on('in-transit', (payload) => {
  setTimeout(() => {
  server.emit('delivered', payload)
  console.log(`DRIVER: Order ${payload.order.orderID} has been DELIVERED`)
  }, 1000)
})