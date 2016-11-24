Template.studenthome.helpers({
	activequiz: function () {
		var student = Meteor.user().username;
		var quizList = quizzes.find({end: false, studentsAttempted: {$nin: [student]}}).fetch();
		return _.map(_.range(0, quizList.length), function(idx) {
			return {quizName: quizList[idx]['quizname'], quizDescription: quizList[idx]['description'], 
				instructor: quizList[idx]['instructor']};
		});
	},
	attemptedquiz: function() {
		var student = Meteor.user().username;
		var quizList = quizzes.find({studentsAttempted: {$in: [student]}}).fetch();
		console.log(quizList);
		console.log('attempted');

		return _.map(_.range(0, quizList.length), function(idx) {	
			return {quizName: quizList[idx]['quizname'], quizDescription: quizList[idx]['description'], 
				instructor: quizList[idx]['instructor']};
		});
	}
});


Template.studenthome.events({
	'click .attemptquiz': function(event) {
		var quizName = event.target.value;
		console.log(quizName);
		Router.go("answerQuiz", {_id: quizName});
	},
	'click .openquiz': function(event) {
		var quizName = event.target.value;
		console.log(quizName);
		Router.go("openQuiz", {_id: quizName});
	}
});

