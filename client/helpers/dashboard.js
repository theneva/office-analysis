Template.Dashboard.rendered = function ()
{

    $('#b-nav').hide();

    var container = document.querySelector('#container');
    var msnry = new Masonry(container, {
        // options
        columnWidth: 10,
        itemSelector: '.item'
    });

    Tracker.autorun(function ()
    {
        var ownerId = Session.get('ownerId');
        var dashboard = Dashboards.findOne({owner_id: ownerId});

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
    })
};

Template.Dashboard.helpers({
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

    }
});