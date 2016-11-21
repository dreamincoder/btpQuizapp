Meteor.publish('quizzes', function () {
    return quizzes.find();
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
    }



});