const readline = require('readline');
const { net } = require('../shared/const.js');
const { EventEmitter } = require('events');
const { encrypt, decrypt } = require('../shared/crypto.js');

const client = new net.Socket();
const eventEmitter = new EventEmitter();

let nickname = '';

client.connect(8000, 'localhost', () => {
    console.log('Подключено к серверу');
    eventEmitter.emit('connected');
});

client.on('data', (data) => {
    const decryptedMessage = decrypt(JSON.parse(data));
    const messageObject = JSON.parse(decryptedMessage);
    console.log(`\n${messageObject.nickname}: ${messageObject.message}`);
    process.stdout.write('Введите сообщение: ');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

eventEmitter.on('connected', () => {
    rl.question('Введите ваш никнейм: ', (name) => {
        nickname = name;
        rl.setPrompt('Введите сообщение: ');
        rl.prompt();
    });

    rl.on('line', (line) => {
        const messageObject = {
            nickname: nickname,
            message: line
        };
        const encryptedMessage = encrypt(JSON.stringify(messageObject));
        client.write(JSON.stringify(encryptedMessage));
        rl.prompt();
    });
});
