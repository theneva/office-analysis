Template.CurrentIntegrations.rendered = function ()
{

    /*Tracker.autorun(function ()
    {

        console.log('rendered');
        var integrations = Integrations.find().fetch();

        console.log(integrations);

        var output = [];


        integrations.forEach(function (integration)
        {
            console.log(integration);
            Meteor.call('checkIfDailyDataObjectExists', integration._id, function (err, dailyObject)
            {
                console.log(dailyObject);
                // If 0, daily data object for integration does not exist, let's make it!
                if (dailyObject.integration_count === 0)
                {
                    Meteor.call('checkIfDashboardForUserExist', Meteor.userId(), function (err, dashboard)
                    {
                        // Dashboard exist
                        if (dashboard.length > 0)
                        {
                            var dashboardId = dashboard[0]._id;
                            Meteor.call('createIntegrationDataObject', integration._id, dashboardId, function (err, res)
                            {
                                console.log(err);
                                console.log(res);
                            });
                        }
                    })
                }
                else
                {

                    //console.log(dailyObject);

                    output.push({
                        name: integration.name,
                        value: dailyObject.object[0].last_value.value
                    });

                    Session.set('output', output);
                }
            })
        });
    })*/

};

Template.CurrentIntegrations.helpers({
    integrations: function ()
    {

        return Integrations.find().fetch();

/*        var integrations = Integrations.find().fetch();

        console.log(integrations);

        return integrations;*/
        /*var output = Integrations.find().fetch();
        Session.set('output', output);

        return Session.get('output');*/
    }
});