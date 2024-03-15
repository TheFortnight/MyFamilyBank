module.exports = class DataBase {

    static pathToDB = './src/database/db.json';

    static getDataFromDb() {

        const fs = require('fs');
        const accountsFromDb = fs.readFileSync(this.pathToDB, 'utf8');
        if (!accountsFromDb) {
            throw Error('No data recevied');
        }
        const accounts = JSON.parse(accountsFromDb);
        //console.log('Got accs: ', this.accounts);
        return accounts;
    };

    static updateDb(accounts) {

        const fs = require('fs');

        try {

            fs.writeFileSync(this.pathToDB, JSON.stringify(accounts, null, 4));
            return true;

        } catch (err) {

            throw Error('Cannot wrtie to database:' + err);

        };

    };

    static getAccsByUser(user) {

        const accs = this.getDataFromDb();
        return accs.filter(acc => acc.user === user);

    };

    static getAccById(id) {

        const accs = this.getDataFromDb();
        return accs.find(acc => acc.id === id);

    };

    static getHistoryByUser(user) {

        const accs = this.getDataFromDb();
        const userAccs = accs.filter(acc => acc.user === user);
        let result = [];
        userAccs.forEach(userAcc => {
            result.push(userAcc.history);
        });

        return result;

    };

    static applyChangesToAcc(account) {

        const accs = this.getDataFromDb();
        const accToChangeInd = accs.findIndex(acc => acc.id === account.id);
        accs.splice(accToChangeInd, 1);
        accs.push(account);
        const result = this.updateDb(accs);
        return result;

    };

};