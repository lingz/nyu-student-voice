Template.userList.helpers({
  user: function() {
    return Meteor.users.find();
  }
});
