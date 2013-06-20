Meteor.methods({
  'isAdmin': function() {
    console.log("checking for admin");
    if (Meteor.user() && Meteor.user().profile) {
      console.log("yes");
      return Meteor.user().profile.type == "admin";
    } else {
      console.log("no");
      return false;
    }
  },
  'changeUserPermissions': function(userId, newType) {
    if (_.contains(["admin", "user"], newType) && Meteor.call("isAdmin") && userId != Meteor.users.findOne({username: "admin"})._id){
      Meteor.users.update(userId, {$set: {"profile.type": newType}});
      return true;
    } else {
      return false;
    }
  }
});

Accounts.onCreateUser(function(options, user) {
  console.log(options);
  user.profile = {type: "user"};
  return user;
});
