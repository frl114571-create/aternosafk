const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'zahridinsmp.aternos.me',
        port: 48315,
        username: 'notAFK1'
    });

    bot.on('spawn', () => {
        console.log('Bot kirdi!');
        setTimeout(() => {
            bot.chat('/login shukrona');
        }, 3000);
        
        // AFKga qarshi harakat
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 10000);
    });

    // Ulanish uzilsa, 5 soniyadan keyin qayta harakat qiladi
    bot.on('end', () => {
        console.log('Ulanish uzildi, qayta ulanishga urinilmoqda...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNRESET') {
            console.log('Server ulanishni rad etdi (ECONNRESET). Qayta urinish...');
        } else {
            console.log('Xatolik:', err);
        }
    });
}

createBot();
