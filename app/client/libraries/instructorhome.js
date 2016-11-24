Template.instructorhome.helpers({
	activequiz: function() {
		var instructor = Meteor.user().username;
		var quizList = quizzes.find({instructor: instructor, end: false}).fetch();
		console.log(quizList);
		return _.map(_.range(0, quizList.length), function(idx) {
			console.log('faaa');
			return {quizName: quizList[idx]['quizname'], quizDescription: quizList[idx]['description']};
		});
	},
	inactivequiz: function() {
		var instructor = Meteor.user().username;
		var quizList = quizzes.find({instructor: instructor, end: true}).fetch();
		console.log(quizList);
		return _.map(_.range(0, quizList.length), function(idx) {
			console.log('faaa');
			return {quizName: quizList[idx]['quizname'], quizDescription: quizList[idx]['description']};
		});
	}
});

Template.instructorhome.events({
	'click .endquiz': function(event) {
		event.preventDefault();
		console.log(event.target.value);
		var instructor = Meteor.user().username;
		var quizName = event.target.value;
		Meteor.call('endQuiz', instructor, quizName, function(err) {
			if (err) {
				console.log(err.reason);
			} else {
				// document.location.reload(true);
			}
		});
	},
	'click .openquiz': function(event) {
		var quizName = event.target.value;
		console.log(quizName);
		Router.go("openQuiz", {_id: quizName});
	}
});
