Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  post: function(postAttributes){
    var user = Meteor.user(),
      postsWithSameLink = Posts.findOne({url: postAttributes.url});
    

    if (!user) {
      throw new Meteor.Error(401, "You need to be logged in to post");
    }

    if (!postAttributes.title) {
      throw new Meteor.Error(422, "Please fill in an issue title");
    }


    if (postAttributes.url && postsWithSameLink){
      throw new Meteor.Error(302,
        "This link has already been posted",
        postsWithSameLink._id);
    }
    
    // whitelisted keys
    var post = _.extend(_.pick(postAttributes,'title', 'url', 'message'),
      {
        userId: user._id,
        author: user.username,
        submitted: new Date().getTime(),
        commentsCount: 0
      });
    
    var postId = Posts.insert(post);
    return postId;
  }
});

