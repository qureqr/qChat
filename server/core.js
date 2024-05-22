const { net } = require('../shared/const.js');

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log('Получено сообщение от клиента:', data.toString());
        socket.write('Сообщение получено и обработано');
    });
});

server.listen(8000, () => {
    console.log('Сервер запущен на порту 8000');
});