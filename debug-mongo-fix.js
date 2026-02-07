const dns = require('dns');
const net = require('net');

const srvAddress = '_mongodb._tcp.cluster0.yasbgfq.mongodb.net';

console.log(`1. Attempting to resolve SRV record for: ${srvAddress}`);

dns.resolveSrv(srvAddress, (err, addresses) => {
    if (err) {
        console.error('❌ SRV Resolution failed:', err.message);
        console.log('\n2. Attempting to guess and resolve shard addresses...');
        
        // Guessed shard names for a typical Cluster0
        const shards = [
            'cluster0-shard-00-00.yasbgfq.mongodb.net',
            'cluster0-shard-00-01.yasbgfq.mongodb.net',
            'cluster0-shard-00-02.yasbgfq.mongodb.net'
        ];

        shards.forEach(shard => {
            dns.lookup(shard, (err, address) => {
                if (err) {
                    console.log(`❌ Failed to look up ${shard}: ${err.message}`);
                } else {
                    console.log(`✅ Successfully resolved ${shard} to ${address}`);
                    checkConnection(shard, 27017);
                }
            });
        });
    } else {
        console.log('✅ SRV Resolution successful!');
        console.log(JSON.stringify(addresses, null, 2));
        
        // Construct the standard connection string part
        const hostPorts = addresses.map(a => `${a.name}:${a.port}`).join(',');
        console.log(`\nConstructed Host List: ${hostPorts}`);
    }
});

function checkConnection(host, port) {
    console.log(`   Trying to connect to ${host}:${port}...`);
    const socket = new net.Socket();
    socket.setTimeout(3000);
    socket.on('connect', () => {
        console.log(`   ✅ TCP Connection established to ${host}:${port}`);
        socket.destroy();
    });
    socket.on('timeout', () => {
        console.log(`   ❌ Timeout connecting to ${host}:${port}`);
        socket.destroy();
    });
    socket.on('error', (err) => {
        console.log(`   ❌ Error connecting to ${host}:${port}: ${err.message}`);
    });
    socket.connect(port, host);
}
