Comments = new Meteor.Collection('comments');
Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    // check the user is logged in
    if (!user){
      throw new Meteor.Error(401, "You need to login to make comments");
    } else if (!commentAttributes.body) {
      throw new Meteor.Error(422, "Please write some content!");
    } else if (!commentAttributes.postId) {
      throw new Meteor.Error(422, "Your comment is not attached to any posts");
    }
    if (!commentAttributes.anonymous) {
      userId = user._id;
      author = user.username;
    } else {
      userId = "anon";
      author = "Anonymous";
    }

    comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: userId,
      author: author,
      submitted: new Date().getTime()
    });

    Posts.update(comment.postId, {
      $inc: {commentsCount: 1}, 
      $addToSet: {subscribers: user._id}
    });

    comment._id =  Comments.insert(comment);
    Meteor.call('createCommentNotificiation', comment);
    return comment._id;
  }
});
