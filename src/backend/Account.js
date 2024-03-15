module.exports = class Account {

    constructor(user, unid, type, period, sum) {
        this.type = type;
        this.period = period;
        this.startTimeStamp = Date.now();
        this.startDate;
        this.endDate;
        this.id = unid;
        this.period = this.period;
        this.user = user;
        this.sum = sum;
        this.interest;
        this.history = [];
        this.history.push({
            user: this.user,
            accId: this.id,
            operationDate: new Date(),
            operationType: 'Открытие счета',
            operationSumm: sum,
        });
        this.checked = false;
        this.requiresApproval = false;
        this.requiresClientAction = false;
    }

    init() {
        this.getStartDate();
        this.getEndDate();
        this.getInterest();
    };

    getStartDate() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        this.startDate = {
            dd,
            mm,
            yyyy
        };

    };

    getEndDate() {

        let { dd, mm, yyyy } = this.startDate;
        if (this.period === 'weekly') {
            const ms = (24 * 60 * 60 * 7 * 1000);
            const endTimeStamp = this.startTimeStamp + ms;
            const endDate = new Date(endTimeStamp);
            const dd = endDate.getDate();
            const mm = endDate.getMonth() + 1;
            const yyyy = endDate.getFullYear();

            this.endDate = {
                dd,
                mm,
                yyyy
            };
        }
            

        if (this.period === 'monthly') {
            mm = mm + 1;
            if (mm > 12) {
                yyyy = yyyy + 1;
                mm = '01'
            }
            this.endDate = {
               dd,
               mm,
               yyyy
            };
        };

        if (this.period === 'yearly') {
            let { dd, mm, yyyy } = this.startDate;
            yyyy = yyyy +1;
            this.endDate = {
                dd,
                mm,
                yyyy
             };
        };
    };

    getInterest() {

        if (this.period === 'weekly') this.interest = 1.2;
        if (this.period === 'monthly') this.interest = 3;
        if (this.period === 'yearly') this.interest = 1;

    };

    

    withdrawMoney(summ) {
        if (summ <= 0) return;
        const summBefore = this.sum;
        this.sum = this.sum - summ;
        this.history.push({
            user: this.user,
            accId: this.id,
            operationDate: new Date(),
            operationType: 'Снятие наличных',
            operationSumm: summ,
            summBefore,
            summAfter: this.sum,
        });
    };

    onLinePurchase(summ, comment) {
        if (summ <= 0) return;
        const summBefore = this.sum;
        this.sum = this.sum - summ;
        this.history.push({
            user: this.user,
            accId: this.id,
            operationDate: new Date(),
            operationType: 'Покупка',
            comment,
            operationSumm: summ,
            summBefore,
            summAfter: this.sum,
        });
    };

    addInterest() {

        const summBefore = this.sum;
        this.sum = this.sum * this.interest;
        this.history.push({
            user: this.user,
            accId: this.id,
            operationDate: new Date(),
            operationType: 'Начисление процентов',
            operationSumm: this.sum - summBefore,
            summBefore,
            summAfter: this.sum,
        });
    };

    getSum() {
        return 222;
    };
};