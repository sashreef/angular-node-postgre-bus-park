const cron = require('cron');
const journeyController = require('./controllers/journey-controller');



const job = new cron.CronJob('00 00 * * *', () => {

  journeyController.addJourneysForScheduler(); 
});

job.start();