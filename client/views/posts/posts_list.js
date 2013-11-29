Template.newPosts.helpers({
  options: function() {
    return {
      sort: {submitted: -1},
      handle: newPostsHandle
    };
  }
});
Template.topPosts.helpers({
  options: function() {
    return {
      resolved: false,
      sort: {votes: -1, submitted: -1},
      handle: topPostsHandle
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
  filtering: function() {
    return Session.get("tags").length > 0;
  },
  tagsList: function() {
    return Session.get("tags").join(", ");
  },
  postsReady: function() {
    return this.handle.ready();
  },
  allPostsLoaded: function () {
    return this.handle.ready() && Posts.find().count() < this.handle.loaded();
  },
  postsWithRank: function() {
    var i = 0, options = {sort: this.sort, limit: this.handle.limit()};
    var query = (this.resolved !== undefined) ? {resolved: this.resolved} : {};
    var tags = Session.get("tags");
    if (tags.length > 0) {
      query.tags = {$in: tags};
    }
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
