const Bank = require('../backend/Bank');

module.exports = class TgMsgProcess {

    static processMsg(name, text) {

        if (text.includes('start') && name === 'Aleksej') {
            const bank = new Bank();
            const balance = bank.checkBalance(name);
            return {name, response: `Алексей, добро пожаловать в Семейный Банк! На твоем основном счете ${balance} дин.`};
        };

        if (text.includes('start') && name === 'Sonja') {
            const bank = new Bank();
            const balance = bank.checkBalance(name);
            return {name, response: `Софья, добро пожаловать в Семейный Банк! На твоем основном счете ${balance} дин.`};
        };
        
        if (text.includes('start') && name === 'Admin') {
            return {name, response: 'Welcome to your Family Bank, sir!'};
        };

        if (text.includes('start') && name === 'Irina') {
            const bank = new Bank();
            const balance = bank.checkBalance(name);
            return {name, response: `Ирина, добро пожаловать в Семейный Банк! На твоем основном счете ${balance} дин.`};
        };

        if (text === '/operate') {
            return {name, response: 'Выберите операцию'};
        };

    };
};