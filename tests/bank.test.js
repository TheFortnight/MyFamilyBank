const Account = require("../src/backend/Account");
const uuidv4 = require('uuid').v4;
const Bank = require('../src/backend/Bank');
const DataBase = require("../src/backend/DataBase");


const bank = new Bank();

bank.addMoneyToAcc('85951d3e-19dc-481d-9318-b5d5b6c7c141', 100, 'на обед');

console.log(DataBase.getAccsByUser('Aleksej'));
