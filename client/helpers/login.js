Template.Login.events({

    'click #register': function (e)
    {
        e.preventDefault();
        var email = document.getElementById('register-email').value;
        var password = document.getElementById('register-password').value;

        Accounts.createUser({email: email, password: password}, function (err)
        {
            if (err)
            {
                alert(err.reason);
            }
            else
            {
                Router.go('/profile');
            }

        });

    },

    'click #login': function (e, t)
    {
        e.preventDefault();

        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;

        Meteor.loginWithPassword(email, password, function (err)
        {
            if (err)
            {
                alert(err.reason);
            }
            else
            {
                Router.go('/profile')
            }
        });
        return false;
    }
});