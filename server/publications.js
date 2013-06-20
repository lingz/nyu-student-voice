Meteor.publish('newPosts', function(limit) {
  return Posts.find({resolved: false}, {sort: {submitted: -1}, limit: limit});
});
Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});

Meteor.publish('bestPosts', function(limit) {
  return Posts.find({resolved: false}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('resolvedPosts', function(limit) {
  return Posts.find({resolved: true}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(postId){
  return Notifications.find({userId: this.userId});
});

Meteor.publish(('users'), function() {
  user = Meteor.users.findOne(this.userId);
  console.log(user);
  if (user.profile.type == "admin") {
    return Meteor.users.find({}, {fields: {"username": 1, "profile.type": 1}});
  }
});
