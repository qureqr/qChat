// Клиент
const readline = require('readline');
const { net } = require('../shared/const.js');
const { EventEmitter } = require('events');
const { encrypt, decrypt } = require('../shared/crypto.js');

const client = new net.Socket();
const eventEmitter = new EventEmitter();
let nickname = '';

client.connect(8000, 'localhost', () => {
    console.log('Подключено к серверу');
    process.stdout.write('Введите ваш ник: ');
});

client.on('data', (data) => {
    const decryptedMessage = decrypt(JSON.parse(data));
    console.log(`\n${decryptedMessage.nickname}: ${decryptedMessage.message}`);
    process.stdout.write('Введите сообщение: ');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    if (!nickname) {
        nickname = line;
        process.stdout.write('Введите сообщение: ');
    } else {
        const message = { nickname, message: line };
        const encryptedMessage = encrypt(JSON.stringify(message));
        client.write(encryptedMessage);
    }
});
