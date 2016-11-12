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

Router.route('/createQuiz', {
  name: 'createQuiz',
  template: 'createQuiz'
});