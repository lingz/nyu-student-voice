Template.notifications.helpers({
  notificationCount: function() {
    return Notifications.find({subscribers: Meteor.userId(), read: {$ne: Meteor.userId}}).count();
  },
  notifications: function() {
    return Notifications.find({subscribers: Meteor.userId(), read: {$ne: Meteor.userId}});
  }
});

Template.notification.helpers({
  commenterNames: function() {
    names = this.commenters.join(", ");
    lastComma = names.lastIndexOf(',');
    if (lastComma !== -1) {
      return names.slice(0, lastComma) + " and " + names.slice(lastComma+2);
    } else {
      return names;
    }
  },
  postTitle: function() {
    post = Posts.findOne(this.postId);
    return post.title;
  }
});

Template.notification.events({
  'click a': function() {
    Meteor.call('readNotification', this._id);
  }
});
