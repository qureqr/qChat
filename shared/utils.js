const readline = require('readline');
const { EventEmitter } = require('events');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const eventEmitter = new EventEmitter();

function getInput() {
    rl.on('line', (line) => {
        eventEmitter.emit('message', line);
    });
    return eventEmitter;
}

module.exports = getInput;
