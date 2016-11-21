function getQuiz(){
	
}

function displayQuiz(){
	var questions = getQuiz();
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
		
		<div class="form-group">
			<label for="category">Category :</label>
			<label class="radio-inline"><input type="radio" name="category" value="student" checked>Student</label>
			<label class="radio-inline"><input type="radio" name="category" value="prof">Prof</label>
		</div>

		var arr = ['A','B','C','D'];
		for(var j=0;j<4;j++){
			var new_option = document.createElement("div");
			new_option.className = "radio";
			new_option.innerHTML = '<label><input type="radio" name="" value="' + arr[j] + '">' + questions[i-1]['options'][j] + '</label>';
			document.getElementById(mainId).appendChild(new_option);
		}
	}

}