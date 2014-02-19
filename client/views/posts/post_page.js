Template.postPage.helpers({
  currentPost: function() {
    return Posts.findOne(Session.get('currentPostId'));
  },
  comments: function() {
    return Comments.find();
  },
  hasComment: function() {
  	return Comments.find().count() > 0;
  }
});

Template.postPage.created = function() {
  Meteor.call("readNotification", Session.get("currentPostId"));
};
