const TelegramApi = require('node-telegram-bot-api');
const TgMsgSort = require('./TgMsgSort');
module.exports = class TelegramBank {

    constructor () {

        this.token = '7052526549:AAE9K1bZh4HdmtT4akneRrEJEx9Gud4QZbE';
        this.bot;
        this.startBot();
        this.initiateMenu();
        this.listenToMsgs();
        this.listenToQueries();
       
    };

    startBot() {
        this.bot = new TelegramApi(this.token, {polling: true});
        console.log('Bot started');
    };

    initiateMenu() {
        this.bot.setMyCommands([
            {command: '/start', description: 'Начало работы'},
            {command: '/operate', description: 'Выбор операции'}
        ])
    };

    listenToMsgs() {

        this.bot.on('message', async msg => {

            const response = TgMsgSort.sortIncomingMsg(msg);
            if (!response) return;
            console.log('Bank recevied response: ', response.response);
            console.log('Listen to msg ID: ', response.id);
            this.sendMsg(response.id, response.response, response.keys);
        
           /*  console.log(msg);
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
    */
        });
    };

    listenToQueries() {

        

        this.bot.on('callback_query', async msg => {

            //console.log('TgBank recevied Query: ', msg);

           
            const respondToQuery = TgMsgSort.sortIncomingQuery(msg);
            if (respondToQuery) {
                const {userId, response, keys} = respondToQuery;
                this.sendMsg(userId, response, keys);
            };
            /*
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
            }*/
        });
    };

    sendMsg = async (chatId, text, keys) => {

        //console.log('Send Msg ID: ', chatId);

        if (!keys) return this.bot.sendMessage(chatId, text)
        .catch(e => console.log(e.message));

        return this.bot.sendMessage(chatId, text, keys)
        .catch(e => console.log(e.message));

    };


};