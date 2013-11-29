Template.main.helpers({
  loggedIn: function() {
    return Meteor.userId();
  }
});

Template.main.events({
  "click #login": function(e) {
    Meteor.loginWithGoogleApps({
      requestPermissions: ["email"],
      requestOfflineToken: true
    });
  }
});
