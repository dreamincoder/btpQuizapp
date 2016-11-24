Meteor.subscribe('quizzes');
Meteor.subscribe('studentAnswers');

var createUser = function (username, password, category) {
    console.log("createUser called with " + username + password + category);
    Meteor.call('createNewUser', username, password, category, function (err, result) {
        if (err) {
        	console.log(err.reason);
        } else {
          console.log(err);
          console.log(result);
        	if(typeof result !== 'undefined')Router.go("login");
        }
    });
};

var loginUser = function (username, password, category) {
	console.log("loginUser called with " + username + password + category);
    Meteor.call('loginUser', username, password, category, function (err, result) {
        if (result) {
        	Meteor.loginWithPassword(username, password, function(error){
						if(error){
							console.log(error.reason);
						} else {
							if(category === "student"){
                Router.go("studenthome");
              }
              else {
                Router.go("instructorhome");
              }
              
						}
					});

        } else {
        	console.log("error");
        }
    });
};


Template.register.events({
  'submit form': function(event){
		event.preventDefault();
      var ldap = $('[name=ldap]').val();
      var password = $('[name=password]').val();
      var category = $('[name=category]:checked').val();
      console.log("username is " + ldap);
      createUser(ldap, password, category);
  }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=ldap]').val();
        var password = $('[name=password]').val();
        var category = $('[name=category]:checked').val();
        loginUser(username, password, category);
    }
});