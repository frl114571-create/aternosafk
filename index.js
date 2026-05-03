const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'zahridinsmp.aternos.me',
  port: 48315,
  username: 'notAFK1'
});

bot.on('spawn', () => {
  console.log('Bot serverga kirdi!');
  
  // Login qilish
  setTimeout(() => {
    bot.chat('/login shukrona');
  }, 2000);

  // AFK qolmaslik uchun harakat algoritmi
  setInterval(() => {
    const actions = ['forward', 'back', 'left', 'right'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    // Tasodifiy tomonga yurish
    bot.setControlState(randomAction, true);
    
    // 50% imkoniyat bilan sakrash
    if (Math.random() > 0.5) {
      bot.setControlState('jump', true);
    }

    // 1 soniyadan keyin harakatni to'xtatish
    setTimeout(() => {
      bot.clearControlStates();
    }, 1000);

  }, 5000); // Har 5 soniyada yangi harakat qiladi
});

// Xatoliklarni ko'rsatish
bot.on('error', (err) => console.log('Xatolik:', err));
bot.on('kicked', (reason) => console.log('Serverdan haydaldi:', reason));
