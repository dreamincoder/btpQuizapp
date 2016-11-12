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
	new_question.className = "form-group";
	new_question.id = mainId;
	document.getElementById('questions').appendChild(new_question);

	new_question = document.createElement("div");
	new_question.className = "form-group";
	new_question.innerHTML = '<label class="quesLabel">' + quesNumber + '</label><input id="question-' + quesNumber + '" type="text" value="" maxlength="100" placeholder="Enter the question"/>';
	document.getElementById(mainId).appendChild(new_question);

	new_question = document.createElement("div");
	new_question.className = "col-md-offset-1";
	new_question.id = "container-"+quesNumber;
	document.getElementById(mainId).appendChild(new_question);

	mainId = "container-"+quesNumber;
	var new_option = document.createElement("div");
	new_option.className = "form-group";
	new_option.innerHTML = '<label>A) </label><input id="ques-' + quesNumber + '-option-A" type="text" value="" maxlength="20" placeholder="Option A"/>';
	document.getElementById(mainId).appendChild(new_option);


	new_option = document.createElement("div");
	new_option.className = "form-group";
	new_option.innerHTML = '<label>B) </label><input id="ques-' + quesNumber + '-option-B" type="text" value="" maxlength="20" placeholder="Option B"/>';
	document.getElementById(mainId).appendChild(new_option);	

	new_option = document.createElement("div");
	new_option.className = "form-group";
	new_option.innerHTML = '<label>C) </label><input id="ques-' + quesNumber + '-option-C" type="text" value="" maxlength="20" placeholder="Option C"/>';
	document.getElementById(mainId).appendChild(new_option);	

	new_option = document.createElement("div");
	new_option.className = "form-group";
	new_option.innerHTML = '<label>D) </label><input id="ques-' + quesNumber + '-option-D" type="text" value="" maxlength="20" placeholder="Option D"/>';
	document.getElementById(mainId).appendChild(new_option);	

	new_option = document.createElement("div");
	new_option.className = "form-group";
	new_option.innerHTML = '<button class="btn btn-danger" id="removeQues" value="' + quesNumber + '" >Remove</button>';
	document.getElementById(mainId).appendChild(new_option);

	increment();

	// var r = document.createElement('span');
	// var y = document.createElement("TEXTAREA");
	// y.setAttribute("cols", "17");
	// y.setAttribute("placeholder", "Enter the question..");

	// var g = document.createElement("BUTTON");
	// var text = document.createTextNode("REMOVE");
	// g.appendChild(text);
	// g.setAttribute("class", "removeQues btn btn-danger");
	
	// var a = document.createElement("INPUT");
	// a.setAttribute("type", "text");
	// a.setAttribute("placeholder", "Option A");

	// var b = document.createElement("INPUT");
	// b.setAttribute("type", "text");
	// b.setAttribute("placeholder", "Option B");

	// var c = document.createElement("INPUT");
	// c.setAttribute("type", "text");
	// c.setAttribute("placeholder", "Option C");

	// var d = document.createElement("INPUT");
	// d.setAttribute("type", "text");
	// d.setAttribute("placeholder", "Option D");

	// increment();
	// y.setAttribute("Name", "textelement_" + i);
	// r.appendChild(y);
	// g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
	// r.appendChild(g);

	// r.appendChild(a);
	// r.appendChild(b);
	// r.appendChild(c);
	// r.appendChild(d);

	// r.setAttribute("id", "id_" + i);
	// document.getElementById("myForm").appendChild(r);
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