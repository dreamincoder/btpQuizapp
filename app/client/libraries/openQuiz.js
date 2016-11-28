// var accounts = new Accounts("abcdefgh");
// console.log(accounts);

// Remove all quizNames and replace with quizIDS
function displayQuizStudent(quizName){
	var quiz = quizzes.findOne({quizname: quizName});
	var questions = quiz['questions'];
	
	var answers = studentAnswers.findOne({quizname: quizName});
	answers = answers['answers'];

	for(var i=1;i<=questions.length;i++){
		var mainId = "questions";

		var new_question = document.createElement("div");
		new_question.className = "questionDiv form-group";
		new_question.innerHTML = '<label>' + i + ') ' + questions[i-1]['question'] + '</label>';
		document.getElementById(mainId).appendChild(new_question);

		new_question = document.createElement("div");
		new_question.className = "question col-md-offset-1";
		new_question.id = "container-"+i;
		document.getElementById(mainId).appendChild(new_question);

		mainId = "container-"+i;

		var arr = ['A','B','C','D'];
		for(var j=0;j<4;j++){
			var new_option = document.createElement("div");
			new_option.className = "radio";
			new_option.innerHTML = '<input type="radio" name="question' + i + '" value="' + arr[j] + '">' + questions[i-1]['options'][j];
			document.getElementById(mainId).appendChild(new_option);
			
			if(answers[i-1] === arr[j]){
				console.log("entered");
				$('[name=question' + i + ']').attr('checked', 'checked');
			}
			$('[name=question' + i + ']').attr('disabled', 'disabled');
		}
	}
}

function displayQuizProf(quizName){
	var quiz = quizzes.findOne({quizname: quizName});
	var questions = quiz['questions'];

	for(var i=1;i<=questions.length;i++){
		var mainId = "questions";

		var new_question = document.createElement("div");
		new_question.className = "questionDiv form-group";
		new_question.innerHTML = '<label>' + i + ') </label> &nbsp &nbsp'+ questions[i-1]['question'];
		document.getElementById(mainId).appendChild(new_question);

		new_question = document.createElement("div");
		new_question.className = "question col-md-offset-1";
		new_question.id = "container-"+i;
		document.getElementById(mainId).appendChild(new_question);

		mainId = "container-"+i;

		var arr = ['A','B','C','D'];
		for(var j=0;j<4;j++){
			var new_option = document.createElement("div");
			new_option.innerHTML = '<label>' + arr[j] + ') </label> &nbsp &nbsp' + questions[i-1]['options'][j];
			document.getElementById(mainId).appendChild(new_option);
		}
	}
}

Template.openQuiz.rendered = function() {
	var quizName = Router.current().params._id;
	if(Meteor.user().profile['category'] === "student"){
		displayQuizStudent(quizName);
	}
	else{
		displayQuizProf(quizName);
	}
}

Template.openQuiz.events({
	'click .goback': function(event){
		event.preventDefault();
		if(Meteor.user().profile['category'] === "student"){
			Router.go("studenthome");
		}
		else{
			Router.go("instructorhome");
		}
	}
});

Template.openQuiz.helpers({
	currentBlock: function () {
		var quizName = Router.current().params._id;
		var quiz = quizzes.findOne({quizname: quizName});
		var id = quiz['quizContractID'];
		var ret;
		if(Meteor.user().profile['category'] === "student"){
			var currblock = blockData.find({quizId:id, studentId: Meteor.user().username}).fetch()[0];
			delete currblock._id;
	    ret = JSON.stringify(currblock, null, 2);
		}
		else{
			var currblock = blockData.find({quizId:id, instructorId: Meteor.user().username}).fetch()[0];
			delete currblock._id;
	    ret = JSON.stringify(currblock, null, 2);
		}
		
		return ret;
   },
});