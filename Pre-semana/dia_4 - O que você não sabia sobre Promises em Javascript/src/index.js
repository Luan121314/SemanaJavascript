const Request = require("./request");
const request = new Request();

async function schedule() {
    console.log("Starting in ", new Date().toISOString());
    const requests = [
        { url: "https://www.mercadobitcoin.net/api/BTC/ticker/" },
        { url: "https://www.EXISTE.net/api/BTC/orderbook/" },
        { url: "https://www.mercadobitcoin.net/api/BTC/orderbook/" }
    ]
        .map(data => ({
            ...data,
            timeout: 2000,
            method: 'get'
        }))
        .map(params => request.makeRequest(params));

    const result = await Promise.allSettled(requests); //Faz o mesmo que allPromisses só que filtra as falhas
    const allSucceded = [];
    const allFailed = [];

    for (const { status, value, reason } of result) {
        if (status === 'rejected') {
            allFailed.push(reason);
            continue;
        }

        allSucceded.push(value)
    }

    console.log("Falhas ", allFailed.length);
    console.log("Sucessos ", allSucceded.length);

}

const PERIOD = 2000;
setInterval(schedule, PERIOD)
