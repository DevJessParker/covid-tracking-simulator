'use strict';

const io = require('socket.io')(3000);
const hub = io.of('/hub');
const Log = require('../lib/log-generator.js');
const Email = require('../lib/email-generator.js');
let locations = [];

//Global Connection
hub.on('connection', socket => {
  console.log(socket.id);

  socket.on('join-room', async (payload) => {  
    let room = `${payload.storeNUM}`;
    try {
    await socket.join(room);
    locations.push(payload.storeNUM);
    console.log('location list', locations);
    console.log('__ROOMS__', socket.rooms);
    } catch {
      console.log('___ERROR___ROOM NOT CREATED');
    }
  })  
  socket.on('order-received', (payload) => {
    let log = new Log('order received', payload);
    console.log(log);
    hub.emit('order-received', payload);
  });
  socket.on('pickup', payload => {
    new Log('pickup', payload);
    hub.emit('pickup', payload);
  })
  socket.on('pickup-scheduled', (payload) => {
    let log = new Log('pickup scheduled', payload);
    console.log(log);
    hub.emit('pickup-scheduled', payload);
  });
  socket.on('in-transit', (payload) => {
    let log = new Log('in-transit', payload);
    console.log(log);
    hub.emit('in-transit', payload);
  });
  socket.on('delivered', (payload) => {
    let log = new Log('delivered', payload);
    console.log(log);
    hub.emit('delivery-confirmed', payload);
  });
  socket.on('delayed', (payload) => {
    let log = new Log('order-delayed', payload);
    console.log(log);
    hub.emit('order-delayed', payload);
  });
  socket.on('returned-to-vendor', (payload) => {
    let log = new Log('returned-to-vendor', payload);
    console.log(log);
    hub.emit('order-delayed', payload);
  });
  socket.on('send-email', (payload) => {
    const email = new Email(payload);
    console.log('VENDOR: send email', email);
  })
})