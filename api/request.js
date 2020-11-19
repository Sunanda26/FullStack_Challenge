const https = require("https")

async function get(q) {
    try {
        let opt = {
            hostname: "www.googleapis.com",
            port: "443",
            path: `/books/v1/volumes?q=${q}&maxResults=40`,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
            }
        }
        return new Promise((resolve, reject) => {
            const req = https.request(opt, res => {
                res.setEncoding("utf8");
                let content = "";
                res.on("data", chunk => {
                    content += chunk;
                });
                res.on("end", () => {
                    resolve(JSON.parse(content));
                });
            });
            req.on("error", e => {
                console.error(e);
                reject(e)
            });
            req.end()
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports.get = get