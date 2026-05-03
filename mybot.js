const mineflayer = require('mineflayer');

// SERVER SOZLAMALARI
const serverHost = 'zahridinsmp.aternos.me';
const serverPort = 48315;

// BOTLAR RO'YXATI
const accounts = [
  { username: 'notAFK1', password: 'shukrona' },
  { username: 'zahridinafk_emas', password: 'shukrona' },
  { username: 'X_PvP_X', password: 'shukrona' },
  { username: 'Zahridin_unban', password: 'shukrona' }
];

function startBot(account) {
  console.log(`[ULANISH] ${account.username} ulanmoqda...`);

  const bot = mineflayer.createBot({
    host: serverHost,
    port: serverPort,
    username: account.username,
    version: false, // Server versiyasini avtomatik aniqlaydi
    hideErrors: true,
    connectTimeout: 60000,
    keepAlive: true
  });

  // --- FUNKSIYALAR ---
  const goToAnarchy = () => {
    if (bot.entity) {
      bot.chat('/server anarxiya2');
      console.log(`[HARAKAT] ${account.username}: /server anarxiya2 yuborildi.`);
    }
  };

  // --- VOQEALAR (EVENTS) ---
  bot.on('spawn', () => {
    console.log(`[OK] ${account.username} serverda spawn bo'ldi.`);
    
    // Kirganda 3 soniyadan keyin login qilish
    setTimeout(() => {
      bot.chat(`/login ${account.password}`);
    }, 3000);

    // 15 soniyadan keyin majburiy anarxiyaga o'tish
    setTimeout(goToAnarchy, 15000);

    // ANTI-AFK: Har 30 soniyada tasodifiy sakrash yoki qimirlash
    setInterval(() => {
      if (bot.entity) {
        const jump = Math.random() > 0.5;
        if (jump) {
          bot.setControlState('jump', true);
          setTimeout(() => bot.setControlState('jump', false), 500);
        }
      }
    }, 30000 + Math.random() * 10000);
  });

  // Chatdagi xabarlarni kuzatish
  bot.on('messagestr', (msg) => {
    const cleanMsg = msg.trim().toLowerCase();
    
    // Agar login so'rasa qayta yuboradi
    if (cleanMsg.includes('/login') || cleanMsg.includes('tizimga kirish')) {
      bot.chat(`/login ${account.password}`);
    }

    // Hubga tushib qolsa yana o'tishga urinadi
    if (cleanMsg.includes('hub') || cleanMsg.includes('lobby')) {
      setTimeout(goToAnarchy, 5000);
    }
  });

  // Xatolik bo'lsa yoki serverdan kicksangiz qayta ulanish
  bot.on('end', (reason) => {
    console.log(`[!] ${account.username} uzildi (${reason}). 30 soniyadan keyin qayta kiradi...`);
    setTimeout(() => startBot(account), 30000);
  });

  bot.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      console.log(`[ERR] ${account.username}: Ulanish rad etildi (ECONNRESET).`);
    } else {
      console.log(`[ERR] ${account.username}: ${err.message}`);
    }
  });
}

// Botlarni navbat bilan (45 soniya farq bilan) ishga tushirish
accounts.forEach((acc, index) => {
  setTimeout(() => {
    startBot(acc);
  }, index * 45000);
});
