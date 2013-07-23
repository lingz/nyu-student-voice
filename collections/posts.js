Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.allow({
  remove: isAdmin,
  update: isAdmin
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    console.log(fieldNames);
    if (isAdmin === false) {
      // may only edit the following fields:
      return (_.without(fieldNames, 'title', 'message', 'subscribers').length > 0);
    } else if (ownsDocument) {
      // if they are an admin editing their own post - they may also resolve it
      return (_.without(fieldNames, 'title', 'message', 'resolved', 'resolution', 'subscribers').length > 0);
    }  else {
      // otherwise they can only resolve posts
      return (_.without(fieldNames, 'resolved', 'resolution', 'subscribers').length > 0);
    }
  }
});

Meteor.methods({
  post: function(postAttributes){
    var user = Meteor.user();
    
    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to post");
    }

    if (!postAttributes.title) {
      throw new Meteor.Error(422, "Please fill in an issue title");
    }


    
    // whitelisted keys
    var post = _.extend(_.pick(postAttributes,'title', 'message'),
      {
        userId: user._id,
        author: user.username,
        submitted: new Date().getTime(),
        commentsCount: 0,
        resolved: false,
        upvoters: [],
        subscribers: [user._id],
        read: [],
        votes: 0
      });
    
    var postId = Posts.insert(post);
    return postId;
  },
  upvote: function(postId) {
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to unvote");
    } 
    Posts.update({
      _id: postId,
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
    return true;
  },
  unvote: function(postId) {
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to unvote");
    } 
    Posts.update({
      _id: postId,
      upvoters: user._id
    }, {
      $pull: {upvoters: user._id},
      $inc: {votes: -1}
    });
    return true;
  },
  resolve: function(postId, resolution) {
    if (! Meteor.call("isAdmin")) {
      throw new Meteor.Error(401, "You need to be an admin to resolve a post");
    }

    Post.update(postId, {$set: {resolved: true, resolution: resolution}});
    
    // resolution success
    return true;
  }
});

