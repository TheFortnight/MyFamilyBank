const Bank = require('../backend/Bank');
const tgKeys = require('./tgKeys');

module.exports = class TgMsgProcessAdmin {

    static processMsg(name, text) {

        if (text === '/start') {
            return {
                name,
                response: 'Welcome to your Family Bank, sir!'
            };
        };

        if (text === '/operate') {
            const keys = tgKeys.adminMenu();
            return {
                name,
                response: 'Choose action',
                keys
            };
        };

    };

    static processQuery(name, query) {

        // console.log('incoming query: ', query);

        const queryObj = JSON.parse(query);

        if (queryObj.user && queryObj.operation) {

            if (queryObj.user === 'all' && queryObj.operation === 'showuser') {

                const bank = new Bank();
                const allUsers = bank.getAllUsers();
                // console.log('ALL USERS: ', allUsers);
                const keys = tgKeys.adminUsersKeys(...allUsers);
                return {
                    name,
                    response: 'Choose client',
                    keys
                };
            }

            if (queryObj.user && queryObj.operation === 'show') {

                const bank = new Bank();
                const userAcss = bank.getUserAccs(queryObj.user);
                 console.log('ALL Accs: ', userAcss);
                const keys = tgKeys.adminAccsByUserKeys(...userAcss);
                console.log('TgAdmin got keys: ', keys);
                return {
                    name,
                    response: 'Choose user account',
                    keys
                };
            };
        }




    };
};