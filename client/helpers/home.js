/*
 * Could possibly remove this whole file.
 */

Template.Home.helpers({
    getUserId: function ()
    {
        return Meteor.userId();
    },
    getLatestValueForIntegration: function ()
    {
        var cursor = IntegrationData.findOne({_id: '', date: '22/3/2015', team_owner_id: 'Z229d8ZZEZ9B4gyaB'});
        return cursor.last_value.value;
    },
    getTeamObject: function ()
    {
        var team = Dashboards.findOne();
    }
});


Template.Home.events({
    'click #updateValue': function ()
    {
        //Meteor.call('setValueAtMinute', 'integrationId', 'teamId', document.getElementById('value').value);
    },
    'click #createDashboard': function ()
    {
        Meteor.call('checkIfDashboardForUserExist', Meteor.userId(), function (err, res)
        {

            // If 0, dashboard for user does not exist, let's make one!
            if (res.length === 0)
            {
                Meteor.call('createDashboard', 'RandomName', Meteor.userId(), function (err, res)
                {
                    console.log(err);
                    console.log(res);
                })
            }
            else
            {
                // Otherwise, the user has a dashboard, let's tell them so!
                alert('User already has a dashboard, called: ' + res[0].name)
            }
        });
    }
});