newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);

Meteor.subscribe('notifications');
Deps.autorun(function() {
  Meteor.subscribe('comments', Session.get('currentPostId'));
  Meteor.subscribe('singlePost', Session.get('currentPostId'));
});
