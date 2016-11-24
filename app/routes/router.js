Router.route('/', {
	name: 'app',
	template: 'app'
});

Router.configure({
    layoutTemplate: 'navigation'
});

Router.route('/login', {
  name: 'login',
  template: 'login'
});

Router.route('/register', {
  name: 'register',
  template: 'register'
});

Router.route('/instructorhome', {
  name: 'instructorhome',
  template: 'instructorhome'
});

Router.route('/studenthome', {
  name: 'studenthome',
  template: 'studenthome'
});

Router.route('/createQuiz', {
  name: 'createQuiz',
  template: 'createQuiz'
});

Router.route('/answerQuiz/:_id', {
  name: 'answerQuiz',
  template: 'answerQuiz', 
  data: function() {
    var quizName = this.params._id;
    return quizzes.findOne({quizname: quizName});
  }
});

Router.route('/openQuiz/:_id', {
  name: 'openQuiz',
  template: 'openQuiz', 
  data: function() {
    var quizName = this.params._id;
    return quizzes.findOne({quizname: quizName});
  }
});