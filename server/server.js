Meteor.publish('getIntegrationData', function ()
{
    return IntegrationData.find();
});

Meteor.publish('getDashboard', function ()
{
    return Dashboards.find({owner_id: this.userId});
});

Meteor.publish('getDashboardById', function (owner_id)
{
    return Dashboards.find({owner_id: owner_id});
});

Meteor.publish('getIntegrations', function ()
{
    return Integrations.find({owner_id: this.userId});
});

Meteor.publish('getIntegrationsById', function (ownerId)
{
    return Integrations.find({owner_id: ownerId});
});


Meteor.methods({
    setValueAtMinute: function (integrationId, value)
    {

        var dt = new Date();


        var date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
        var hour = dt.getHours().toString();
        var minute = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();

        var setModifier = {$set: {}};
        setModifier.$set['data.' + hour + '.' + minute] = value;
        setModifier.$set['last_value.time'] = hour + ':' + minute;
        setModifier.$set['last_value.value'] = value;

        console.log(setModifier);


        return IntegrationData.update(
            {
                'date': date,
                'integration_id': integrationId
            },
            setModifier
        );

        /*        Meteor.call('getDateInfo', function (err, res)
         {
         var setModifier = {$set: {}};
         setModifier.$set['data.' + res.hour + '.' + res.minute] = value;
         setModifier.$set['last_value.time'] = res.hour + ':' + res.minute;
         setModifier.$set['last_value.value'] = value;

         console.log(setModifier);


         return IntegrationData.update(
         {
         'date': res.date,
         'integration_id': integrationId
         },
         setModifier
         );
         })*/
    },
    getDateInfo: function ()
    {
        var dt = new Date();

        return {
            date: dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear(),
            hour: dt.getHours().toString(),
            minute: (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
        };
    },
    getLatestValueForIntegration: function ()
    {
        var dt = new Date();

        var date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

        var value = IntegrationData.findOne({
            date: date
        });

        console.log(value);

        return value.last_value.value;

    },
    checkIfDashboardForUserExist: function (owner_id)
    {
        return Dashboards.find({
            "owner_id": owner_id
        }).fetch();
    },
    createDashboard: function (name, owner_id)
    {
        Dashboards.insert({
            "name": name,
            "owner_id": owner_id,
            "layout": [
                {
                    "container": 0,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 1,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                },
                {
                    "container": 2,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 3,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 4,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 5,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 6,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 7,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 8,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 9,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 10,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }, {
                    "container": 11,
                    "integration": {
                        "type": "",
                        "integration_id": ""
                    }
                }
            ]
        });
    },
    createCustomIntegration: function (owner_id, name, description)
    {
        var inserted = Integrations.insert({
            "type": "custom",
            "owner_id": owner_id,
            "name": name,
            "description": description
        });

        console.log(inserted);

        return inserted;
    },
    checkIfDailyDataObjectExists: function (integration_id)
    {

        var dt = new Date();
        var date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

        console.log(date);

        var integration = IntegrationData.find({
            "integration_id": integration_id,
            "date": date // <-- Datoen det gjelder for
        }).fetch();

        return {
            object: integration,
            object_count: integration.length
        };

    },
    createIntegrationDataObject: function (integration_id)
    {

        var dt = new Date();
        var date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

        var integrationData = IntegrationData.insert(

            {
                "integration_id": integration_id,
                "date": date,
                "last_value": {
                    "time": "",
                    "value": ""
                },
                "data": {
                    "00": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "01": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "02": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "03": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "04": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "05": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "06": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "07": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "08": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "09": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "10": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "11": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "12": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "13": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "14": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "15": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "16": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "17": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "18": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "19": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "20": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "21": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "22": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "23": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            }
        );

        return integrationData;
    },
    setImplementationForLayoutBox: function (dashboard_id, selectedBox, integration_type, integration_id)
    {

        console.log(dashboard_id);
        console.log(selectedBox);
        console.log(integration_type);
        console.log(integration_id);

        var setModifier = {$set: {}};
        setModifier.$set['layout.' + selectedBox + '.integration.type'] = integration_type;
        setModifier.$set['layout.' + selectedBox + '.integration.integration_id'] = integration_id;

        var update = Dashboards.update(
            {
                '_id': dashboard_id
            },
            setModifier
        );

        console.log(update);
    }
});


/*
 Meteor.publishComposite('layoutWithData', function (userId)
 {
 return {
 find: function ()
 {
 return Dashboards.find({owner_id: userId})
 },
 children: [
 {
 find: function (dashboard)
 {

 // Find post author. Even though we only want to return
 // one record here, we use "find" instead of "findOne"
 // since this function should return a cursor.
 */
/*return Meteor.users.find(
 {_id: post.authorId},
 {limit: 1, fields: {profile: 1}});*//*

 //console.log();


 var s = [];

 for (var i = 0; i < dashboard.layout.length; i++)
 {
 var obj = dashboard.layout[i];
 console.log(obj);

 s.push(obj);
 //Integrations

 }

 return s;

 //return dashboard.layout;

 }
 }
 */
/*,
 {
 find: function (layouts)
 {

 console.log(layouts);

 },
 children: [
 {
 find: function ()
 {

 }
 }
 ]
 }*//*

 ]
 }
 });*/
