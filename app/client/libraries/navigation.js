Template.navigation.helpers({
  isProf: function (category) {
    return category === "prof"
  }
});

Template.navigation.events({
    'click .logout': function(event){
        console.log("logout called");
        event.preventDefault();
        Meteor.logout();
        Router.go('app');
    }
});