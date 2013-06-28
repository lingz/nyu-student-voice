newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);
resolvedPostsHandle = Meteor.subscribeWithPagination('resolvedPosts', 10);

Meteor.subscribe('notifications');
Deps.autorun(function() {
  Meteor.subscribe('comments', Session.get('currentPostId'));
  Meteor.subscribe('singlePost', Session.get('currentPostId'));
});


Deps.autorun(function() {
  adminMode = false;
  var user = Meteor.user();
  if (user && user.profile && user.profile.type == "admin") {
    userHandle = Meteor.subscribe("users");
    Session.set("admin", true);
    adminMode = true;
  } else {
    Session.set("admin", false);
    if (adminMode) {
      userHandle.stop();
    }
  }
});

