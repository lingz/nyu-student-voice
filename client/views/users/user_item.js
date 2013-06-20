Template.userItem.helpers({
  admin: function() {
    return this.profile.type == "admin";
  }
});

Template.userItem.events({
  "click #changeUser": function(e) {
    e.preventDefault();
    var target = $(e.target);

    var userId = target.data("userid"); 
    var newType = target.data("newtype");

    Meteor.call("changeUserPermissions", userId, newType, function(err, resp){
      if (err) {
        Meteor.Errors.throwError(err.reason);
      } else if (resp === false){
        Meteor.Errors.throwError("Sorry, you don't have permission to do that.");
      }
    });
  }
});
