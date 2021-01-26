const Pagination = require("./pagination");

(async () => {
    const pagination = new Pagination();
    const fistPage = 770e3;

    const req = pagination.getPagination({
        url: 'https://www.mercadobitcoin.net/api/BTC/trades/',
        page: fistPage
    })

    for await (const items of req) {
        console.table(items);
    }
})()