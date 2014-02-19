Meteor.publish('newPosts', function(limit) {
  return Posts.find({sort: {submitted: -1}, limit: limit, fields: {subscribers: 0, realId: 0}});
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id, {fields: {subscribers: 0, realId: 0}});
});

Meteor.publish('topPosts', function(limit) {
  return Posts.find({resolved: false}, {sort: {votes: -1, submitted: -1}, limit: limit, fields: {subscribers: 0, realId: 0}});
});

Meteor.publish('resolvedPosts', function(limit) {
  return Posts.find({resolved: true}, {sort: {submitted: -1}, limit: limit, fields: {subscribers: 0, realId: 0}});
});

Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId}, {fields: {realId: 0}});
});

Meteor.publish('ownComments', function(postId) {
  return Comments.find({postId: postId, realId: this.userId});
});

Meteor.publish('notifications', function(){
  return Notifications.find({subscribers: this.userId, read: {$ne: this.userId}});
});

Meteor.publish("ownPosts", function(){
  return Posts.find({realId: this.userId});
});

Meteor.publish(('users'), function() {
  user = Meteor.users.findOne(this.userId);
  if (user.profile.type == "admin") {
    return Meteor.users.find({}, {fields: {"username": 1, "profile.type": 1, "services": 1}});
  }
});

Meteor.publish("tags", function() {
  return Tags.find();
});
