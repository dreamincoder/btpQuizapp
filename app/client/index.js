
Router.route('/', {
	name: 'home',
    template: 'home'
});

Router.configure({
    layoutTemplate: 'main'
});


Router.route('/register');
Router.route('/login');

Template.register.events({
    'submit form': function(event){
		event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        console.log("username is " + username);
        Accounts.createUser({
			//~ email: email,
			username: username,
			password: password
		}, function(error){
			if(error){
				console.log(error.reason); // Output error if registration fails
			} else {
				console.log("Trying to add ");
				QuizInstance.addStudent(username, {from: web3.eth.accounts[0], gas: 500000});
				console.log("Account " + username + " created");
				Router.go("home"); // Redirect user if registration succeeds
			}
		});

    }
});

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(username, password, function(error){
			if(error){
				console.log(error.reason);
			} else {
				Router.go("home");
			}
		});

    }
});

Template.question.events({
	'submit form': function(e,template){
        //~ event.preventDefault();
        var username = Meteor.user().username;
        var answer = template.find('input').value;
       	console.log("Answer is " + answer);
        if(!QuizInstance.checkIfAnswered(username)) {
        	console.log("Answering");
			QuizInstance.storeAnswer(username, answer, {from: web3.eth.accounts[0], gas: 500000});
			console.log("Answered");
		}
		else{
			alert("You have already alswered the question");
		}

    }
});

