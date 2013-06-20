Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'title', 'message').length > 0);
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
        votes: 0
      });
    
    var postId = Posts.insert(post);
    return postId;
  },
  upvote: function(postId) {
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to upvte");
    } 
    Posts.update({
      _id: postId,
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
});

