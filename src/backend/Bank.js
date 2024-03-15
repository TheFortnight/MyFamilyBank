const Account = require('./Account');
const DataBase = require('./DataBase');

module.exports = class Bank {

    constructor() {
        this.users = {
            Sonja: 'Sonja',
            Aleksej: 'Aleksej',
        };
        this.accounts = [];
        this.totalSumm;
        this.pendingRequests = [];

    };

    createNewAccount(user, unid, type, period, sum) {

        const newAccount = new Account(user, unid, type, period, sum);
        newAccount.init();
        const accs = DataBase.getDataFromDb();
        accs.push(newAccount);
        const result = DataBase.updateDb(accs);
        return result;
    };

    addAccToBank(acc) {

        this.accounts.push(acc);


    };

    checkDate() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        const todayNum = this.dateAsNumber({
            dd,
            mm,
            yyyy
        });

        this.accounts.forEach(acc => {

            if (!acc.checked && !acc.requiresClientAction && todayNum >= this.dateAsNumber(acc.endDate)) {
                acc.requiresClientAction = true;
                acc.checked = true;
                this.pendingRequests.push(acc);
            };

            if (acc.checked && !acc.requiresApproval && todayNum < this.dateAsNumber(acc.endDate)) {
                acc.checked = false;
            };

        });
    };

    prolongAcc(unid) { // add interest and start new period
        const accInd = this.accounts.findIndex(ac => ac.id === unid);
        this.accounts[accInd].getStartDate();
        this.accounts[accInd].getEndDate();
        this.accounts[accInd].addInterest();
    };

    closeAcc(unid) { // delete account
        const accInd = this.accounts.findIndex(ac => ac.id === unid);
        if (accInd === -1) throw new Error(`Account ${unid} doesn't exist!`);
        this.accounts.splice(accInd, 1);
        console.log('Account successfully closed');
    };

    dateAsNumber(date) {
        const {
            dd,
            mm,
            yyyy
        } = date;
        const todayString = yyyy.toString() + mm.toString + dd.toString();
        return +todayString;
    };

    checkBalance(user) {
        console.log('Checking balance for ', user);
        const accs = DataBase.getAccsByUser(user);
        const regAcc = accs.find(acc => acc.user === user && acc.type === 'regular');
        if (!regAcc) throw new Error('No such user');
        return regAcc.sum;
    };

    addMoneyToAcc = (id, summ, comment) => {

        if (summ <= 0) return;

        const acc = DataBase.getAccById(id);
        //if (acc.type == 'deposit')
        const summBefore = acc.sum;
        acc.sum = acc.sum + summ;
        acc.history.push({
            user: acc.user,
            accId: acc.id,
            operationDate: new Date(),
            operationType: 'Пополнение счета',
            comment,
            operationSumm: summ,
            summBefore,
            summAfter: acc.sum,
        });

        const result = DataBase.applyChangesToAcc(acc);
        return result;
        
    };

    withdrawMoneyFromAcc = (id, summ, comment) => {

        if (summ <= 0) return;

        const acc = DataBase.getAccById(id);
        console.log('Bank found acc: ', acc);
        //if (acc.type == 'deposit')
        const summBefore = this.sum;
        if (summBefore < summ) {
            return 'not enough funds';
        }
        acc.sum = acc.sum - summ;
        acc.history.push({
            user: acc.user,
            accId: acc.id,
            operationDate: new Date(),
            operationType: 'Пополнение счета',
            comment,
            operationSumm: summ,
            summBefore: summBefore,
            summAfter: acc.sum,
        });

        const result = DataBase.applyChangesToAcc(acc);
        return result;
        
    };

    getAllUsers() {

        const accs = DataBase.getDataFromDb();
        const allUsers = [];
        accs.forEach(acc => {
            if (!allUsers.length) allUsers.push(acc.user);
            if (allUsers.length && !allUsers.find(userName => userName === acc.user)) {
                allUsers.push(acc.user);
            };
        });
        return allUsers;

    };
    
    getUserAccs (user) {
        return DataBase.getAccsByUser(user);
    }


};