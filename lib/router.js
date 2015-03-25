Router.configure({
    layoutTemplate: 'Layout'
});

Router.route('/', {
    waitOn: function ()
    {
        return Meteor.subscribe('getIntegrationData') && Meteor.subscribe('getDashboard') && Meteor.subscribe('getIntegrations');
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
        return Meteor.subscribe('getIntegrationData') && Meteor.subscribe('getDashboard') && Meteor.subscribe('getIntegrations');
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
        return Meteor.subscribe('getIntegrationData') && Meteor.subscribe('getDashboard') && Meteor.subscribe('getIntegrations');
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
    action: function ()
    {
        if (this.ready())
        {
            this.render('Profile');
        }
    }
});

Router.route('/login', {
    action: function ()
    {
        if (this.ready())
        {
            this.render('Login');
        }
    }
});

Router.route('/dashboard/:owner_id', {
    waitOn: function ()
    {
        Session.set('ownerId', this.params.owner_id);
        console.log(this.params.owner_id);
        return Meteor.subscribe('getIntegrationData') && Meteor.subscribe('getDashboardById', this.params.owner_id) && Meteor.subscribe('getIntegrationsById', this.params.owner_id);
    },
    action: function ()
    {
        if (this.ready())
        {
            this.render('Dashboard');
        }
    }
});

// Server side / REST
Router
    .route('/api/sensordata/:integration_id?', {where: 'server'})
    .get(function (req, response)
    {
        var integration_id = this.params.integration_id;

        Meteor.call('getIntegrationDataForCurrentDate', integration_id, function (err, res) {
            response.setHeader('access-control-allow-origin', '*');
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(res))
        });

    })
    .post(function (req, response, next)
    {
        // API key
        /*var apiKey = this.request.headers['x-apikey'];*/

        var integrationId = this.request.body.integrationId;

        var value = this.request.body.value;

        Meteor.call('checkIfDailyDataObjectExists', integrationId, function (err, res)
        {
            if (err)
            {
                console.log('error 96: ' + JSON.stringify(err));
            }

            // A daily object exist, let's use it!
            if (res.object_count !== 0)
            {
                Meteor.call('setValueAtMinute', integrationId, value, function (err, res)
                {
                    if (err)
                    {
                        console.log('error 102: ' + JSON.stringify(err));
                    }

                    console.log('res 104: ' + JSON.stringify(res));

                    response.setHeader("Content-Type", "application/json");
                    response.setHeader('access-control-allow-origin', '*');
                    response.end(JSON.stringify({'status': 200, '_id': res._id}))
                })
            }
            else
            {
                Meteor.call('createIntegrationDataObject', integrationId, function (err, res)
                {
                    if (err)
                    {
                        console.log('error 112: ' + JSON.stringify(err));
                    }

                    Meteor.call('setValueAtMinute', integrationId, value, function (err, res)
                    {
                        if (err)
                        {
                            console.log('error 115: ' + JSON.stringify(err));
                        }

                        response.setHeader("Content-Type", "application/json");
                        response.setHeader('access-control-allow-origin', '*');
                        response.end(JSON.stringify({'status': 200, '_id': res._id}))
                    })
                })
            }
        });
    });

/*
Router
    .route('/api/sensordata/:integration_id', {where: 'server'})
    .get(function ()
    {

        console.log(this.params.integration_id);


        this.response.setHeader("Content-Type", "application/json");
        this.response.end(JSON.stringify({'message': 'API key not defined!'}))
    });*/
