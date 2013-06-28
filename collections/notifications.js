Notifications = new Meteor.Collection('notifications');

Meteor.methods({
  createCommentNotificiation: function(comment) { 
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
        $addToSet: {commenters: comment.author},
        $set: {read: [comment.userId], subscribers: post.subscribers}
      });
    }
  },
  readNotification: function(notificationId) {
    Notifications.update({
      $addToSet: {read: Meteor.user()._id}
   });
  }
});
