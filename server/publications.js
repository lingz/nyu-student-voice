Meteor.publish('newPosts', function(limit) {
  return Posts.find({sort: {submitted: -1}, limit: limit}, {subscribers: -1});
});
Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id, {subscribers: -1});
});

Meteor.publish('bestPosts', function(limit) {
  return Posts.find({resolved: false}, {sort: {votes: -1, submitted: -1}, limit: limit}, {subscribers: -1});
});

Meteor.publish('resolvedPosts', function(limit) {
  return Posts.find({resolved: true}, {sort: {submitted: -1}, limit: limit}, {subscribers: -1});
});

Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(){
  return Notifications.find({subscribers: this.userId, read: {$ne: this.userId}});
});

Meteor.publish(('users'), function() {
  user = Meteor.users.findOne(this.userId);
  if (user.profile.type == "admin") {
    return Meteor.users.find({}, {fields: {"username": 1, "profile.type": 1}});
  }
});
