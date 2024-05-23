// Сервер
const { net } = require('../shared/const.js');

const sockets = [];

const server = net.createServer((socket) => {
    sockets.push(socket);

    socket.on('data', (data) => {
        console.log('Получено сообщение от клиента:', data.toString());

        // Отправляем сообщение всем клиентам, кроме отправителя
        sockets.forEach((client) => {
            if (client !== socket) {
                client.write(data);
            }
        });
    });

    socket.on('error', (err) => {
        console.log('Произошла ошибка:', err.message);
    });

    socket.on('end', () => {
        sockets.splice(sockets.indexOf(socket), 1); // Удаляем сокет из массива при отключении
    });
});

server.listen(8000, () => {
    console.log('Сервер запущен на порту 8000');
});
