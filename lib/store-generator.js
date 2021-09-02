'use strict';

const faker = require('faker');

class Store {
  constructor(num) {
    this.storeNUM = `STORE#${num}`,
    this.location = faker.address.cityName
  }
}

module.exports = Store