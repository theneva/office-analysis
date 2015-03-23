Template.EditDashboard.rendered = function ()
{

    InitMasonry();

    $('#integration-chooser').hide();
    $('#predefinedIntegration').hide();
    $('#customIntegration').hide();

    Tracker.autorun(function ()
    {

        var dashboard = Dashboards.findOne({owner_id: Meteor.userId()});

        if (typeof dashboard !== 'undefined')
        {

            console.log(dashboard);

            Session.set('dashboardId', dashboard._id);

            for (var i = 0; i < dashboard.layout.length; i++)
            {
                var layout = dashboard.layout[i];

                if (layout.integration.integration_id !== "")
                {
                    var integration = Integrations.findOne({
                        _id: layout.integration.integration_id
                    });

                    var integrationData = IntegrationData.findOne({
                        integration_id: integration._id
                    });

                    if (typeof integrationData !== 'undefined')
                    {
                        Session.set(i + '-value', integrationData.last_value.value);
                        Session.set(i + '-description', integration.description);
                    }
                    else
                    {
                        Session.set(i + '-value', 'N/A');
                    }
                }
                else
                {
                    Session.set(i + '-value', 'N/A');
                }
            }
        }
    })
};


Template.EditDashboard.helpers({
    doesDashboardExist: function ()
    {
        var dashboard = Dashboards.findOne({owner_id: Meteor.userId()});
        console.log(dashboard);
        //Session.set('lol', 'lol');

        return typeof dashboard !== 'undefined';

    },
    dashboardId: function ()
    {
        return Session.get('dashboardId');
    },
    layout: function ()
    {
        var layoutArray = [
            {
                "container": 0,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(0 + '-value'),
                    "integrationDescription": Session.get(0 + '-description')
                }
            }, {
                "container": 1,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(1 + '-value'),
                    "integrationDescription": Session.get(1 + '-description')
                }
            },
            {
                "container": 2,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(2 + '-value'),
                    "integrationDescription": Session.get(2 + '-description')
                }
            }, {
                "container": 3,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(3 + '-value'),
                    "integrationDescription": Session.get(3 + '-description')
                }
            }, {
                "container": 4,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(4 + '-value'),
                    "integrationDescription": Session.get(4 + '-description')
                }
            }, {
                "container": 5,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(5 + '-value'),
                    "integrationDescription": Session.get(5 + '-description')
                }
            }, {
                "container": 6,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(6 + '-value'),
                    "integrationDescription": Session.get(6 + '-description')
                }
            }, {
                "container": 7,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(7 + '-value'),
                    "integrationDescription": Session.get(7 + '-description')
                }
            }, {
                "container": 8,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(8 + '-value'),
                    "integrationDescription": Session.get(8 + '-description')
                }
            }, {
                "container": 9,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(9 + '-value'),
                    "integrationDescription": Session.get(9 + '-description')
                }
            }, {
                "container": 10,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(10 + '-value'),
                    "integrationDescription": Session.get(10 + '-description')
                }
            }, {
                "container": 11,
                "integration": {
                    "integrationName": "",
                    "integrationData": Session.get(11 + '-value'),
                    "integrationDescription": Session.get(11 + '-description')
                }
            }
        ];

        return layoutArray;

        //var integration = Session.get('Testing');


        //return Session.get('Testing');
        //return dataArray.list();

    },
    customIntegrations: function ()
    {
        console.log(Integrations.find().fetch());
        return Integrations.find().fetch();
    }
});


var selectedBox = 0;
var previousBox = 0;

Template.EditDashboard.events({
    'click #createDashboard': function () {
        Meteor.call('createDashboard', 'Somename', Meteor.userId(), function (err, res) {
            if (!err) {

                // Must reload because of Masonry...?
                location.reload();
            }
        });
    },
    'click .item': function (e)
    {
        $('#predefinedIntegration').prop('selectedIndex', 0);
        $('#customIntegration').prop('selectedIndex', 0);

        $('#customIntegration').hide();
        $('#predefinedIntegration').hide();

        // If user selects two different boxes, unselect the first one
        if ($(e.currentTarget).attr('data-container') !== selectedBox)
        {
            if (selectedBox !== 0)
            {

                $("div").find("[data-container='" + selectedBox + "']").removeClass('selected-item');
                selectedBox = $(e.currentTarget).attr('data-container');
            }
        }

        if ($(e.currentTarget).hasClass('selected-item'))
        {
            $('#integration-chooser').hide();
            $(e.currentTarget).removeClass('selected-item');
            selectedBox = 0;
        }
        else
        {
            $('#integration-chooser').show();
            $(e.currentTarget).addClass('selected-item');

            selectedBox = $(e.currentTarget).attr('data-container');

        }
    },
    'click .integration': function (e)
    {
        var integrationType = $(e.currentTarget).attr('data-integrationType');

        if (integrationType === 'customIntegration')
        {
            $('#customIntegration').show();
            $('#predefinedIntegration').hide();
        }
        else if (integrationType === 'predefinedIntegration')
        {
            $('#customIntegration').hide();
            $('#predefinedIntegration').show();
        }
    },
    'change #predefinedIntegration': function (e)
    {
        //Meteor.call('setSquareImplementation', 'dmiD89uh7axCGog6z', selectedBox, $(e.target).val());
    },
    'change #customIntegration': function (e)
    {
        Meteor.call('setImplementationForLayoutBox', Session.get('dashboardId'), selectedBox, 'custom', $(e.target).val());
    }
});

function InitMasonry () {
    var container = document.querySelector('#container');
    var msnry = new Masonry(container, {
        // options
        columnWidth: 10,
        itemSelector: '.item'
    });
}