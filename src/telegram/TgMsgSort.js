const TgMsgProcess = require('./TgMsgProcess');
const TgMsgProcessAdmin = require('./TgMsgProcessAdmin');

module.exports = class TgMsgSort {

    static users = [{
        name: 'Aleksej',
        tgId: 6401566428
    }, {
        name: 'Admin',
        tgId: 548415338
    }, {
        name: 'Sonja',
        tgId: 5123545035
    }, {
        name: 'Irina',
        tgId: 222
    }];


    static sortIncomingMsg(msg) {

        console.log('MSG id: ', msg.chat.id, ', text: ', msg.text);
        const userName = this.getUserById(msg.chat.id);
        if (!userName) return false;
        let respond;
        if (userName === 'Admin') {
            respond = TgMsgProcessAdmin.processMsg(userName, msg.text);
            if (respond) {
                const {
                    name,
                    response,
                    keys
                } = respond;
                const id = this.getUserIdByName(name);
                return ({id, response, keys});
            };
        };

        respond = TgMsgProcess.processMsg(userName, msg.text);
        if (!respond) return false;
        if (respond) {
            const id = this.getUserIdByName(respond.name);
            const resp = respond.response
            return {
                id,
                resp
            };
        };

    };

    static sortIncomingQuery(msg) {
        //console.log('SORTING QUERY: ', msg)
        const userId = msg.message.chat.id
        const userName = this.getUserById(userId);
        if (userName === 'Admin') {
            const respond = TgMsgProcessAdmin.processQuery(userName, msg.data);
            if (respond) {
                const { response, keys } = respond;
                //console.log('SORT user ID: ', userId);
                return {userId: userId, response, keys};
            }
        }

    };

    static getUserById(id) {
        const user = this.users.find(user => user.tgId === id);
        if (!user) console.error('No users with id: ', id);
        return user.name;
    };

    static getUserIdByName(name) {
        const user = this.users.find(user => user.name === name);
        if (!user) console.error('No users with name: ', name);
        return user.tgId;
    };

};