'use strict';

const io = require('socket.io-client');
const server = io.connect('http://localhost:3000/hub');

server.on('vaccine-requested', (payload) => {
  // const delayVar = (Math.ceil(Math.random() * 10))
  setTimeout(() => {
    switch (Math.floor(Math.random() * 4)) {
    case 1: 
      server.emit('in-transit', payload);
      console.log(`VACCINE DELIVERY STATUS: Vaccines for ${payload.order.orderID} are now IN TRANSIT`)
    case 2: 
      server.emit('delayed', payload)
      console.log(`VACCINE DELIVERY STATUS: Vaccines for ${payload.order.orderID} are now DELAYED`)
    case 3: 
      server.emit('unable-to-fulfill', payload)
      console.log(`VACCINE DELIVERY STATUS: Vaccines for ${payload.order.orderID} are UNABLE TO BE FULFILLED`)
    }
  }, 1000)
})

server.on('in-transit', (payload) => {
  setTimeout(() => {
  server.emit('delivered', payload)
  console.log(`VACCINE DELIVERY STATUS: Vaccines for ${payload.order.orderID} have been DELIVERED`)
  }, 1000)
})