Router.configure({
    layoutTemplate: 'Layout'
});

Router.route('/', {
    waitOn: function ()
    {
        return Meteor.subscribe('getValues') && Meteor.subscribe('getTeam') && Meteor.subscribe('getIntegrations');
    },
    action: function ()
    {
        if (this.ready())
        {
            this.render('Home')
        }
    }
});

Router.route('/edit-dashboard', {
    waitOn: function ()
    {
        return Meteor.subscribe('getValues') && Meteor.subscribe('getTeam') && Meteor.subscribe('getIntegrations');
    },
    action: function ()
    {
        if (this.ready())
        {
            this.render('EditDashboard')
        }
    }
});

Router.route('/integrations', {
    waitOn: function ()
    {
        return Meteor.subscribe('getValues') && Meteor.subscribe('getTeam') && Meteor.subscribe('getIntegrations');
    },
    action: function ()
    {
        if (this.ready())
        {
            this.render('IntegrationsPage')
        }
    }
});

Router.route('/profile', {
    action: function () {
        if (this.ready()) {
            this.render('Profile');
        }
    }
});

Router.route('/login', {
    action: function () {
        if (this.ready()) {
            this.render('Login');
        }
    }
});

// Server side / REST
Router
    .route('/api/sensordata/', {where: 'server'})
    .get(function ()
    {
        this.response.setHeader("Content-Type", "application/json");
        this.response.end(JSON.stringify({'message': 'API key not defined!'}))
    })
    .post(function ()
    {
        // API key
        var apiKey = this.request.headers['x-apikey'];

        var integrationId = this.request.body.integrationId;

        console.log(integrationId);

        var value = this.request.body.value;

        Meteor.call('checkIfDailyDataObjectExists', integrationId, function (err, res) {
            if (err) console.log(err);

            console.log(res);

            // A daily object exist, let's use it!
            if (res.object_count !== 0) {
                Meteor.call('setValueAtMinute', integrationId, value, function (err, res) {
                    if (err) console.log(err);

                    console.log(res);
                })
            } else {
                Meteor.call('createIntegrationDataObject', integrationId, function (err, res) {
                    if (err) console.log(err);

                    Meteor.call('setValueAtMinute', integrationId, value, function (err, res) {
                        if (err) console.log(err);

                        console.log(res);
                    })
                })
            }
        });


    });