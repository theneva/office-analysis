Template.Login.events({

    'click #register': function (e)
    {
        e.preventDefault();
        var email = document.getElementById('register-email').value;
        var password = document.getElementById('register-password').value;

        Accounts.createUser({email: email, password: password}, function (err) {
            if (err) {
                console.log(err);
                alert(err.reason);
            } else {
                Router.go('/profile');
            }

        });

    },

    'click #login': function (e, t)
    {
        e.preventDefault();
        // retrieve the input field values
        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function (err)
        {

            if (err)
            {
                alert(err.reason);
                console.log(err);
            }
            else
            {
                console.log('Logged in');
                Router.go('/profile')
            }

            /*if (err);
             // The user might not have been found, or their passwword
             // could be incorrect. Inform the user that their
             // login attempt has failed.
             else
             // The user has been logged in.*/
        });
        return false;
    }
});