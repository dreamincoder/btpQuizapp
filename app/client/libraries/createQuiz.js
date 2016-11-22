Meteor.subscribe('quizzes');

var quesNumber = 1;
function increment(){
	quesNumber += 1;
}

Template.createQuiz.events({
    'click .addNew': function(event){
      event.preventDefault();
      addQuestion();
      updateLabels();
    },
    'click #removeQues': function(event){
      var num = $(event.currentTarget).attr("value");

      var elementId = 'questionDiv-' + num;
      var element_to_remove = document.getElementById(elementId);
      document.getElementById('questions').removeChild(element_to_remove);
      updateLabels();
    },
    'submit form': function(event){
        event.preventDefault();

        //array containing all questions
        var questions = document.getElementsByClassName('questionDiv');

        //structure to be stored
        var quiz = {
        	'quizContractID': '',
        	'quizname': '',
        	'description': '',
        	'instructor': '',
        	'start': false,
        	'end': false,
        	'questions': [],
        	'studentsAttempted': []
        }

        //structure of a single question
        var question = {
        	'question': '',
        	'options': [],
        	'answer': ''
        }

        for(var i=0;i<questions.length;i++){
        	question['question'] = questions[i].getElementsByClassName('question')[0].value;
        	var options = ["A","B","C","D"];
        	for(var j=0;j<4;j++){
        		options[j] = questions[i].getElementsByClassName('option')[j].value;
        	}
        	question['options'] = options;
        	question['answer'] = questions[i].getElementsByClassName('answer')[0].value;
        	quiz['questions'].push(question);
        }
        quiz['description'] = document.getElementsByClassName('description')[0].value;
        quiz['quizname'] = document.getElementsByClassName('quizname')[0].value;
        quiz['start'] = true;
        quiz['instructor'] = Meteor.user().username;
        console.log(JSON.stringify(quiz));

        Meteor.call('storeQuiz', quiz, function(err, result) {
        	if(err){
        		console.log(err.reason);
        	}
        	else{
        		Router.go("instructorhome");
        	}
        });
    }
});

function updateLabels(){
	var labels = document.getElementsByClassName('quesLabel');
	for(var i=0;i<labels.length;i++){
		labels[i].innerHTML = i+1;
	}
}

//questions
//questionDiv-1
//question-1
//ques-1-option-A

function addQuestion(){
	var mainId = "questionDiv-"+quesNumber;
	var new_question = document.createElement("div");
	new_question.className = "questionDiv form-group";
	new_question.id = mainId;
	document.getElementById('questions').appendChild(new_question);

	new_question = document.createElement("div");
	new_question.className = "form-group";
	new_question.innerHTML = '<label class="quesLabel">' + quesNumber + '</label><input class="question form-control" type="text" value="" maxlength="100" placeholder="Enter the question"/>';
	document.getElementById(mainId).appendChild(new_question);

	new_question = document.createElement("div");
	new_question.className = "col-md-offset-1";
	new_question.id = "container-"+quesNumber;
	document.getElementById(mainId).appendChild(new_question);

	mainId = "container-"+quesNumber;
	
	var arr = ['A','B','C','D'];
	for(var i=0;i<4;i++){
		var new_option = document.createElement("div");
		new_option.className = "form-group";
		new_option.innerHTML = '<label>' + arr[i] +') </label><input class="option form-control" type="text" value="" maxlength="20" placeholder="Option ' + arr[i] +'"/>';
		document.getElementById(mainId).appendChild(new_option);
	}
	var new_option = document.createElement("div");
	new_option.className = "form-group";
	new_option.innerHTML = '<label>Answer) </label><input class="answer form-control" type="text" value="" maxlength="20" placeholder="Answer"/>';
	document.getElementById(mainId).appendChild(new_option);

	new_option = document.createElement("div");
	new_option.className = "form-group";
	new_option.innerHTML = '<button class="btn btn-danger" id="removeQues" value="' + quesNumber + '" >Remove</button>';
	document.getElementById(mainId).appendChild(new_option);

	increment();
}

function removeElement(parentDiv, childDiv){
	if (childDiv == parentDiv){
		alert("The parent div cannot be removed.");
	}
	else if (document.getElementById(childDiv)){
		var child = document.getElementById(childDiv);
		var parent = document.getElementById(parentDiv);
		parent.removeChild(child);
	}
	else{
		alert("Child div has already been removed or does not exist.");
		return false;
	}
}

