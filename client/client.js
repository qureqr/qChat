const getInput = require('../shared/utils.js');
const { net } = require('../shared/const.js');

const client = new net.Socket();
const eventEmitter = getInput();

client.connect(8000, 'localhost', () => {
    console.log('Подключено к серверу');
    process.stdout.write('Введите сообщение: ');
});

client.on('data', (data) => {
    console.log('\nПолучено сообщение от сервера:', data.toString());
    process.stdout.write('Введите сообщение: ');
});

eventEmitter.on('message', (message) => {
    client.write(message);
});
