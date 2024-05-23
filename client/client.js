// Клиент
const readline = require('readline');
const { net } = require('../shared/const.js');
const { EventEmitter } = require('events');

const client = new net.Socket();
const eventEmitter = new EventEmitter();

client.connect(8000, 'localhost', () => {
    console.log('Подключено к серверу');
    eventEmitter.emit('connected');
});

client.on('data', (data) => {
    console.log('\nПолучено сообщение от сервера:', data.toString());
    process.stdout.write('Введите сообщение: ');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

eventEmitter.on('connected', () => {
    rl.setPrompt('Введите сообщение: ');
    rl.prompt();

    rl.on('line', (line) => {
        client.write(line);
        rl.prompt();
    });
});
