module.exports = {

    adminMenu() {

        return {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'show users', callback_data: JSON.stringify({user: 'all', operation: 'showuser'})}, {text: 'requests', callback_data: JSON.stringify({user: 'all', operation: 'showrequests'})}],
                ]
            })
        };

    },

    adminUsersKeys(...users) {

        const buttons = [];
        users.forEach (user => buttons.push({text: user, callback_data: JSON.stringify({user: user, operation: 'show'})}));

        return {
            reply_markup: JSON.stringify({
                inline_keyboard: [buttons],
            })
        };

    },

    adminAccsByUserKeys(...accs) {
        let i =1;
        const buttons = [];
        accs.forEach (acc => buttons.push({text: `123456`, callback_data: JSON.stringify({acc: acc.id, operation: 'show'})}));

        return {
            reply_markup: JSON.stringify({
                inline_keyboard: [buttons],
            })
        };

    },
    

};