Posts = new Meteor.Collection('posts');

Meteor.methods({
  post: function(postAttributes){
    var user = Meteor.user(),
      postsWithSameLink = Posts.findOne({url: postAttributes.url});

    if (!user)
      throw new Meteor.Error(401, "You need to be logged in to post");

    if (!postAttributes.title)
      throw new Meteor.Error(422, "Please fill in an issue title");

    if (postAttributes.URL && postsWithSameLink)
      throw new Meteor.Error(302,
        "This link has already been posted",
        postsWithSameLink._id);
    
    // whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'),
      {
        userId: user._id,
        author: user.username,
        submitted: new Date().getTime()
      });

    return postId;
  }
});

