
const getInput = require('../shared/utils.js');
const { net } = require('../shared/const.js');

const client = new net.Socket();
client.connect(8000, 'localhost', async () => {
    console.log('Подключено к серверу');
    const message = await getInput('Введите сообщение: ');
    client.write(message);
});

client.on('data', (data) => {
    console.log('Получено сообщение от сервера:', data.toString());
});
