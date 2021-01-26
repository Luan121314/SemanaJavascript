const Request = require("./request");

const DEFAULT_OPTIONS = {
    maxRetries: 4,
    retryTimeout: 1000,
    maxRequestTimeout: 1000,
    threshold: 1000
}

class Pagination {
    constructor(options = DEFAULT_OPTIONS) {
        this.request = new Request();

        this.maxRetries = options.maxRequestTimeout
        this.retryTimeout = options.retryTimeout
        this.maxRequestTimeout = options.maxRequestTimeout
        this.threshold = options.threshold
    }

    async handleRequest({ url, page, retries = 1 }) {
        try {
            const finalUrl = `${url}?tid=${page}`;
            const result = await this.request.makeRequest({
                url: finalUrl,
                method: 'get',
                timeout: this.maxRequestTimeout
            })

            return result;
        } catch (error) {
            if (retries === this.maxRetries) {
                console.log(`[${retries}] max retries reached`);
                throw error;
            }
            console.log(`[${retries}] an error: [${error.message}] has happened!\nTrying again in ${this.retryTimeout} ms`);
            await Pagination.sleep(this.retryTimeout)

            return this.handleRequest({ url, page, retries: retries += 1 })
        }
    }

    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     Os generators são usados para trabalhar com dados sob demanda
     precisamos anostar a função com * e usar o yield para retornar dados sob demanda
     quando usamos o yield {0}

     oretorno pode ser {done: false, value: 0}
     const t = getPaginated()

     r.next() => {done: false, value: 0}
     r.next() => {done: true, value: 0}

     quando queremos delegar uma execução (não retorna valor, delegar!)

     yield* fuunção

     *
     */

    async * getPagination({ url, page }) {
        const result = await this.handleRequest({ url, page })
        const lastId = result[result.length - 1]?.tid ?? 0
        if (lastId === 0) return;

        yield result
        await Pagination.sleep(this.threshold)
        yield* this.getPagination({ url, page: lastId })
    }
}

module.exports = Pagination;