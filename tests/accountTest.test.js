const Account = require("../src/Account");
const uuidv4 = require('uuid').v4;

const testAccount = new Account('Sonja', uuidv4(), 'deposit', 'monthly', 1000);
testAccount.init();
testAccount.addMoney(2500);
console.log('Get Summ: ', testAccount.getSum());
//console.log('Acc obj: ', JSON.stringify(testAccount));