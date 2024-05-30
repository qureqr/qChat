const readline = require('readline');
const { net } = require('../shared/const.js');
const { EventEmitter } = require('events');
const { encrypt, decrypt } = require('../shared/crypto.js');

const client = new net.Socket();
const eventEmitter = new EventEmitter();

let nickname = '';
let isNicknameSet = false;

client.connect(8000, 'localhost', () => {
    console.log(
        ('                  d8b                        \n' +
            '                  ?88                   d8P  \n' +
            '                   88b               d888888P\n' +
            '.d88b,.88P d8888b  888888b  d888b8b    ?88\'  \n' +
            '88P  `88P\'d8P\' `P  88P `?8bd8P\' ?88    88P   \n' +
            '?8b  d88  88b     d88   88P88b  ,88b   88b   \n' +
            '`?888888  `?888P\'d88\'   88b`?88P\'`88b  `?8b  \n' +
            '    `?88                                     \n' +
            '      88b                                    \n' +
            '      ?8P                                    '));
    eventEmitter.emit('connected');
});

client.on('data', (data) => {
    if (!isNicknameSet) return; // Игнорируем сообщения, если никнейм не установлен

    const decryptedMessage = decrypt(JSON.parse(data));
    const messageObject = JSON.parse(decryptedMessage);

    // Очищаем текущую строку ввода перед выводом сообщения
    readline.cursorTo(process.stdout, 0);
    process.stdout.clearLine();
    console.log(`${messageObject.nickname}: ${messageObject.message}`);

    // Возвращаем приглашение для ввода сообщения
    rl.prompt(true);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

eventEmitter.on('connected', () => {
    rl.question('Введите ваш никнейм: ', (name) => {
        nickname = name;
        isNicknameSet = true; // Устанавливаем флаг, что никнейм введен
        rl.setPrompt(`${nickname}: `);
        rl.prompt();
    });

    rl.on('line', (line) => {
        if (!isNicknameSet) {
            console.log('Пожалуйста, введите ваш никнейм.');
            rl.question('Введите ваш никнейм: ', (name) => {
                nickname = name;
                isNicknameSet = true; // Устанавливаем флаг, что никнейм введен
                rl.setPrompt(`${nickname}: `);
                rl.prompt();
            });
        } else {
            const messageObject = {
                nickname: nickname,
                message: line
            };
            const encryptedMessage = encrypt(JSON.stringify(messageObject));
            client.write(JSON.stringify(encryptedMessage));
            rl.prompt();
        }
    });
});
