Template.CreateIntegration.events({
   'click #createIntegration': function (e) {
       e.preventDefault();

       var name = document.getElementById('integrationName').value;
       var description = document.getElementById('integrationDescription').value;

       Meteor.call('createCustomIntegration', Meteor.userId(), name, description, function (err, res) {
           // Res = ID of integration
           document.getElementById('integrationID').value = "http://localhost:3000/api/sensordata/" + res;
       });

   }
});