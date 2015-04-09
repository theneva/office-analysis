Template.CurrentIntegrations.helpers({
    integrations: function ()
    {
        return Integrations.find().fetch();
    }
});