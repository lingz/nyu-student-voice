Template.notifications.helpers({
  notificationCount: function() {
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  },
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  }
});

Template.notification.events({
  'click a': function() {
    return Notifications.update(this._id, {$set: {read: true}});
  }
});
