const readline = require('readline');

function getInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

module.exports = getInput;