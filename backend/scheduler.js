const cron = require('cron');
const journeyController = require('./controllers/journey-controller');



const job = new cron.CronJob('7 16 * * *', () => {

  journeyController.addJourneysForScheduler(); 
});

job.start();