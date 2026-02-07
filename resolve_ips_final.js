const https = require('https');

const shards = [
    'cluster0-shard-00-00.yasbgfq.mongodb.net',
    'cluster0-shard-00-01.yasbgfq.mongodb.net',
    'cluster0-shard-00-02.yasbgfq.mongodb.net'
];

shards.forEach(shard => {
    const url = `https://dns.google/resolve?name=${shard}&type=A`;
    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                if (json.Answer && json.Answer.length > 0) {
                    console.log(`IP:${shard}=${json.Answer[json.Answer.length - 1].data}`);
                } else {
                    console.log(`FAIL:${shard}=No Answer`);
                }
            } catch (e) {
                console.error(`ERROR:${shard}=${e.message}`);
            }
        });
    }).on('error', (e) => {
        console.error(`REQ_ERROR:${shard}=${e.message}`);
    });
});
