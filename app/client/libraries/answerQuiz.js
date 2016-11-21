Meteor.subscribe('quizzes');

// var accounts = new Accounts("abcdefgh");
// console.log(accounts);

function displayQuiz(){
	var quiz = quizzes.findOne({});
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

Template.answerQuiz.events({
	'click .showquiz': function(event){
		event.preventDefault();
		console.log("event called");
		displayQuiz();
  }
});


