const { net } = require('../shared/const.js');

const client = new net.Socket();
client.connect(8000, 'localhost', () => {
    console.log('Подключено к серверу');
    client.write('Привет, сервер!');
});

client.on('data', (data) => {
    console.log('Получено сообщение от сервера:', data.toString());
});
