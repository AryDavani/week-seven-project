const Controller = require('../controllers/controller');

module.exports = function(app) {

  app.get('/activites', Controller.activites); // Show a list of all activities I am tracking, and links to their individual pages.

  app.post('/activites', Controller.newActivity); // Create a new activity for me to track.

  app.get('/activites/{id}', Controller.showOneActivity); // Show information about one activity I am tracking, and give me the data I have recorded for that activity.

  app.put('/activites/{id}', Controller.updateOneActivity); // Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.

  app.delete('/activites/{id}', Controller.deleteOneActivity); // Delete one activity I am tracking. This should remove tracked data for that activity as well.

  app.post('/activites/{id}/stats', Controller.addStats); // Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

  app.delete('/activites/{id}', Controller.deleteStats); // 	Remove tracked data for a day.

};
