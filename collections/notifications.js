Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames, modifier) {
    if (_.without(fieldNames, "read").length > 0 && modifier == "$addToSet") {
      return true;
    }
  }
});

Meteor.methods({
  createCommentNotificiation: function(comment) { 
    if (!Comments.findOne(comment._id)) {
      throw new Meteor.Error(412, "This comment doesn't exist");
    }
    var post = Posts.findOne(comment.postId);
    var notification = Notifications.findOne({postId: post._id, type: "comment"});
    if (!notification){
      Notifications.insert({
        type: "comment",
        subscribers: post.subscribers,
        postId: post._id,
        commenters: [comment.author],
        read: [comment.userId]
      });
    } else {
      Notifications.update(notification._id, {
        $set: {read: [comment.userId], subscribers: post.subscribers, commenters: [comment.author]}
      });
    }
  },
  createResolutionNotification: function(postId) {
    var post = Posts.findOne(postId);
    if (!this.isSimulation && !isAdmin()) {
      throw new Meteor.Error(403, "Sorry, you don't have permission to do that");
    } else if (!post.resolved) {
      throw new Meteor.Error(412, "That post is not yet resolved");
    }
    var notification = Notifications.findOne({postId: postId, type: "resolution"});
    if (!notification){
      Notifications.insert({
        type: "resolution",
        subscribers: post.subscribers,
        postId: postId,
        commenters: [Meteor.user().username],
        read: [Meteor.userId()]
      });
    } else {
      Notifications.update(notification._id, {
        $set: {read: [Meteor.userId()], subscribers: post.subscribers, commenters: [Meteor.user().username]}
      });
    }
  },
  readNotification: function(postId) {
    Notifications.update({postId: postId}, {
      $addToSet: {read: Meteor.userId()}
   });
  },
  readAllNotifications: function(notificationIds) {
    Notifications.update({_id: {$in: notificationIds}}, {$addToSet: {read: Meteor.userId()}});
  }
});
