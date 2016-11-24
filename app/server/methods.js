Meteor.publish('quizzes', function () {
    return quizzes.find();
});

Meteor.publish('studentAnswers', function () {
    return studentAnswers.find();
});

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
        return Accounts.createUser(userQuery);
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
    },

    submitQuiz: function(student, quizName, answers) {
        var entry = quizzes.findOne({quizname: quizName});
        quizzes.update({_id: entry._id},{$push: {studentsAttempted: student}});
        var entry = {
            'quizname' : quizName,
            'student' : student,
            'answers' : answers
        }
        studentAnswers.insert(entry);

    }
});