Template.newPosts.helpers({
  options: function() {
    return {
      sort: {submitted: -1},
      handle: newPostsHandle
    };
  }
});
Template.bestPosts.helpers({
  options: function() {
    return {
      resolved: false,
      sort: {votes: -1, submitted: -1},
      handle: bestPostsHandle
    };
  }
});
Template.resolvedPosts.helpers({
  options: function() {
    return {
      resolved: true,
      sort: {submitted: -1},
      handle: resolvedPostsHandle
    };
  }
});
Template.postsList.helpers({
  postsReady: function() {
    return this.handle.ready();
  },
  allPostsLoaded: function () {
    return this.handle.ready() && Posts.find().count() < this.handle.loaded();
  },
  postsWithRank: function() {
    var i = 0, options = {sort: this.sort, limit: this.handle.limit()};
    var query = this.resolved ? {resolved: this.resolved} : {};
    return Posts.find(query, options).map(function(post) {
      post._rank = i;
      i += 1;
      return post;
    });
  }
});

Template.postsList.events({
  'click .load-more': function(e) {
    e.preventDefault();
    this.handle.loadNextPage();
  }
});


