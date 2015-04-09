Template.Profile.events({
    'click #logout': function ()
    {
        Meteor.logout(function (err)
        {
            if (err)
            {
                console.log(err);
            }

            if (!err)
            {
                Router.go('/');
            }

        })
    }
});