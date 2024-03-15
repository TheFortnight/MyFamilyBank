const TelegramApi  = require('node-telegram-bot-api');
const Account = require("../backend/Account");
const uuidv4 = require('uuid').v4;
const Bank = require('../backend/Bank');
const TelegramBank = require('./TelegramBank');

try {
    const tgBank = new TelegramBank();
} catch(e) {
    console.error('Bot error: ', e);
};

/*const bot = new TelegramApi('7052526549:AAE9K1bZh4HdmtT4akneRrEJEx9Gud4QZbE', {polling: true});

const adminKeys = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'вспомни имя свое', callback_data: '000'}, {text: 'вспомни имя свое', callback_data: '000'}],
            [{text: 'вспомни имя свое', callback_data: '000'}],
        ]
    })
};

const clientKeys = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'проверить баланс', callback_data: '010'}, {text: 'открыть депозит', callback_data: '001'}],
            [{text: 'посмотреть историю операций', callback_data: '111'}],
        ]
    })
};

const clientDepoKeys = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'неделя', callback_data: '201'}, {text: 'месяц', callback_data: '202'}],
        ]
    })
};

const approveDeclKeys = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'approve', callback_data: '501'}, {text: 'decline', callback_data: '502'}],
        ]
    })
};

let newAcc = {};
let client;
let clientId

const start = () => {

    let waitForSumm = false;
    

    bot.on('message', async msg => {
        
        console.log(msg);
        const msgText = msg.text;
        const chatId = msg.chat.id;

        if (chatId != '548415338' && chatId != '6401566428') {
            await bot.sendMessage(chatId, `You are not Bank client`)
            .catch(e => console.log(e.message));
            return;
        };

        if (chatId === 548415338 && !waitForSumm) {
            return bot.sendMessage(chatId, `Hello, Admin!`, adminKeys)  
            .catch(e => console.log(e.message));
        };

        if (chatId === 6401566428 && !waitForSumm) {
            return bot.sendMessage(chatId, `Привет, Алексей!`, clientKeys)
            .catch(e => console.log(e.message));
        };

        if (waitForSumm) {

            if (!isNaN(+msgText)) {
                newAcc.sum = +msgText;
                waitForSumm = false;
                await bot.sendMessage(548415338, `У вас новая заявка на открытие счета: ${newAcc.user}, ${newAcc.period}, сумма ${newAcc.sum}.`, approveDeclKeys);
                return bot.sendMessage(clientId, `Твоя заявка на открытие депозита отправлена в Банк. Ожидай подтверждения.`, clientKeys);
            }

            return bot.sendMessage(chatId, `Нужно ввести только цифры. Попробуй еще раз.`, clientKeys);
        };

    });

    bot.on('callback_query', async msg => {
        //console.log(msg.data);
        const chatId = msg.message.chat.id;
        if (msg.data === '010') {
            const bank = new Bank();
            bank.getAccounts();
            const currBal = bank.checkBalance('Aleksej');
            console.log('Bot gets balance: ', currBal);
            return bot.sendMessage(chatId, `На твоем счете ${currBal} дин.`, clientKeys);
        }
        if (msg.data === '111') {
            
            return bot.sendMessage(chatId, `Эта функция пока недоступна`, clientKeys);
        }
        if (msg.data === '001') {
            if (chatId === 6401566428) {
                client = 'Aleksej';
                clientId = 6401566428;
            }
            return bot.sendMessage(chatId, `Выбери срок депозита`, clientDepoKeys);
        }
        if (msg.data === '201') {
            newAcc.user = client;
            newAcc.type = 'deposit';
            newAcc.period = 'weekly';
            waitForSumm = true;
            return bot.sendMessage(chatId, `Введи сумму депозита на неделю`);
        }
        if (msg.data === '202') {
            newAcc.user = client;
            newAcc.type = 'deposit';
            newAcc.period = 'monthly';
            waitForSumm = true;
            return bot.sendMessage(chatId, `Введи сумму депозита на месяц`);
        }
        if (msg.data === '501') {
            const createAcc = new Account(newAcc.user, uuidv4(), 'deposit', newAcc.period, newAcc.sum);
            createAcc.init();
            const bank = new Bank();
            bank.getAccounts();
            bank.addAccToBank(createAcc);
            bank.updateDb();
            newAcc = undefined;
            await bot.sendMessage(clientId, `Депозит успешно создан. Спасибо за обращение!`);
            return bot.sendMessage(548415338, `Новый счет успешно создан`);
        }
        if (msg.data === '502') {
            newAcc.type = 'deposit';
            newAcc.period = 'monthly';
            return bot.sendMessage(chatId, `Выбери сумму депозита на месяц`);
        }
    });

};
*/
//start();
