Template.instructorhome.helpers({
	quiz: function() {
	  return _.map(_.range(1, 7), function(idx) {
	    return {quizName: 'quiz' + idx};
	  });
	}
});
