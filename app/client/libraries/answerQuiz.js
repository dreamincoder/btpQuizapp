Meteor.subscribe('quizzes');

// var accounts = new Accounts("abcdefgh");
// console.log(accounts);

// Remove all quizNames and replace with quizIDS
function displayQuiz(quizName){
	var quiz = quizzes.findOne({quizname: quizName});
	var questions = quiz['questions'];
	
	console.log(quiz);
	console.log(questions);
	console.log(questions);
	for(var i=1;i<=questions.length;i++){
		var mainId = "questions";

		var new_question = document.createElement("div");
		new_question.className = "form-group";
		new_question.innerHTML = '<label>' + i + ') ' + questions[i-1]['question'] + '</label>';
		document.getElementById(mainId).appendChild(new_question);

		new_question = document.createElement("div");
		new_question.className = "col-md-offset-1";
		new_question.id = "container-"+i;
		document.getElementById(mainId).appendChild(new_question);

		mainId = "container-"+i;

		var arr = ['A','B','C','D'];
		for(var j=0;j<4;j++){
			var new_option = document.createElement("div");
			new_option.className = "radio";
			new_option.innerHTML = '<label><input type="radio" name="" value="' + arr[j] + '">' + questions[i-1]['options'][j] + '</label>';
			document.getElementById(mainId).appendChild(new_option);
		}
	}
}

Template.answerQuiz.helpers({
});

Template.answerQuiz.rendered = function() {
	console.log("on create");
	var quizName = Router.current().params._id;
	displayQuiz(quizName);
}

Template.answerQuiz.events({
	'click .submitquiz': function(event){
		event.preventDefault();
		var quizName = Router.current().params._id;
		var student = Meteor.user().username;
		console.log(quizName);
		Meteor.call('submitQuiz', student, quizName, function(err) {
			if (err) {
				console.log(err.reason);
			} else {
				// document.location.reload(true);
				Router.go("studenthome");
			}
		});
  }
});


