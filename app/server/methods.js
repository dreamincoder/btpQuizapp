Meteor.publish('quizzes', function () {
    return quizzes.find();
});

Meteor.publish('studentAnswers', function () {
    return studentAnswers.find();
});

function alphaToNum(val){
    if(val === 'A')return 1;
    else if(val === 'B')return 2;
    else if(val === 'C')return 3;
    else if(val === 'D')return 4;
    else return 0;
}

// // set provider
//if (typeof web3 == "undefined") {
	//ip of machine running ethereum(miner)
    web3 = new Web3(new Web3.providers.HttpProvider("http://10.129.28.61:8545"));
//}


var instrManager = web3.eth.accounts[0];
var stdntManager = web3.eth.accounts[0] ;

var quizAppContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getNumQuizzes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"instructorId","type":"bytes32"}],"name":"addInstructor","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"validQuizId","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"studentId","type":"bytes32"},{"name":"answers","type":"uint256[]"},{"name":"quizId","type":"uint256"}],"name":"submitAnswers","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"studentId","type":"bytes32"},{"name":"quizId","type":"uint256"}],"name":"getStudentAnswers","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInstructors","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"quizId","type":"uint256"},{"name":"instructorId","type":"bytes32"},{"name":"actualAns","type":"uint256[]"}],"name":"createQuiz","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"instructorId","type":"bytes32"}],"name":"instructorAlreadyExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"instructorId","type":"bytes32"},{"name":"quizId","type":"uint256"}],"name":"endQuiz","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"}],"name":"checkIfStudent","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"studentId","type":"bytes32"}],"name":"addStudent","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"studentId","type":"bytes32"},{"name":"quizId","type":"uint256"}],"name":"alreadyAttempted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"studentId","type":"bytes32"}],"name":"studentAlreadyExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"quizId","type":"uint256"}],"name":"getActualAnswers","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getStudents","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes32"}],"name":"checkIfInstructor","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"instrManager","type":"address"},{"name":"stdntManager","type":"address"}],"payable":false,"type":"constructor"}]);

var quizApp = quizAppContract.at("0x7938327cc6a93720bf7a7d30d1766229d1d6168e");

Meteor.methods({
    createNewUser: function (username, password, category) {
        
        //need to check
        // check(username, String);
        // check(email, String);
        // check(password, String);
        
        var userQuery = {
            username: username,
            password: password,
            profile: {
                category: category
            }
        }

        if(category === "student"){
	        quizApp.addStudent(username, {from: web3.eth.accounts[0], gas: 500000});
	        return Accounts.createUser(userQuery);
	      //   quizApp.addStudent(username, {from: web3.eth.accounts[0], gas: 500000}, Meteor.bindEnvironment( function(err,res){
	      //   	if(typeof res !== 'undefined'){
	      //   		console.log("entered");
	      //   		var ret = Accounts.createUser(userQuery);
	      //   		console.log(ret);
	      //   		retval = 100;
	      //   		return 10;
	      //   	}
	      //   	else{
	      //   		console.log("200enter");
							// return 200;
	      //   	}
	      //   }));



	      }
	      else{
	      	quizApp.addInstructor(username, {from: web3.eth.accounts[0], gas: 500000});
	        return Accounts.createUser(userQuery);
	      }

        
    },

    loginUser: function(username, password, category) {
        return (
            Meteor.users.findOne({
                username: username,
                profile: {
                    category: category
                }
            })
        ) ? true : false;
    },

    storeQuiz: function(quiz) {
    		if(quizID.find().fetch().length !== 0){
    			var entry = quizID.findOne();
    			quizID.update( {_id: entry._id}, {$set:{ value: entry['value']+1 } } );	
    		}
    		else{
    			var entry = {'value': 1};
    			quizID.insert(entry);
    		}
    		quiz['quizContractID'] = quizID.findOne()['value'];

    		var questions = quiz['questions'];
    		var answers = [];

    		for(var i=0;i<questions.length;i++){
    			answers.push(alphaToNum(questions[i]['answer']));
    		}
    		quizApp.createQuiz(quiz['quizContractID'], quiz['instructor'], answers, {from: web3.eth.accounts[0], gas: 500000});
    		
    		return quizzes.insert(quiz);
    },

    getActiveQuizzes: function(instrName) {
        return quizzes.find({instructor: instrName, end: false}).fetch();
    },

    getInactiveQuizzes: function(instrName) {
        return quizzes.find({instructor: instrName, end: true}).fetch();
    },

    endQuiz: function(instrName, quizName) {
        
        var entry = quizzes.findOne({instructor: instrName, quizname: quizName});
        quizzes.update({_id: entry._id},{$set:{end : true}});

        quizApp.endQuiz(entry['instructor'], entry['quizContractID'], {from: web3.eth.accounts[0], gas: 500000});
    },

    submitQuiz: function(student, quizName, answers) {
        var entry = quizzes.findOne({quizname: quizName});
        quizzes.update({_id: entry._id},{$push: {studentsAttempted: student}});
        var updatedEntry = {
            'quizname' : quizName,
            'student' : student,
            'answers' : answers
        }
        studentAnswers.insert(updatedEntry);

        var questions = quiz['questions'];
    		var answersNew = [];

    		for(var i=0;i<questions.length;i++){
    			answersNew.push(alphaToNum(questions[i]['answer']));
    		}

    		quizApp.submitAnswers(student, answersNew, entry['quizContractID'], {from: web3.eth.accounts[0], gas: 500000});
    }
});