const mineflayer = require('mineflayer');

const botOptions = {
    host: 'zahridinsmp.aternos.me',
    port: 48315,
    username: 'notAFK1',
    version: false // Server versiyasini bot o'zi aniqlaydi
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    // Serverga ulanganda
    bot.on('spawn', () => {
        console.log(`[Bot] ${bot.username} serverga kirdi.`);
        
        // Siz yaratgan script bo'yicha login qilish
        // Login: shukrona
        setTimeout(() => {
            bot.chat('/login shukrona');
            console.log(`[Bot] Login buyrug'i yuborildi.`);
        }, 2000); 
    });

    // Bot o'limi yoki chiqib ketishi (Reconnect funksiyasi)
    bot.on('end', (reason) => {
        console.log(`[Bot] Serverdan chiqib ketdi. Sabab: ${reason}`);
        console.log(`[Bot] 5 soniyadan so'ng qayta ulanishga harakat qilinadi...`);
        
        setTimeout(() => {
            createBot();
        }, 5000);
    });

    // Xatolik yuz berganda
    bot.on('error', (err) => {
        console.log(`[Bot] Xatolik yuz berdi: ${err.message}`);
    });

    // Chatda xabarlarni ko'rish (Konsol uchun)
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`<${username}> ${message}`);
    });
}

// Botni ishga tushirish
createBot();