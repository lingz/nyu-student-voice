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
    console.log(commentAttributes.anonymous);
    if (!commentAttributes.anonymous) {
      userId = user._id;
      author = user.services.googleApps.name;
    } else {
      userId = "anon";
      author = "Anonymous";
    }

    comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: userId,
      author: author,
      realId: user._id,
      submitted: new Date().getTime()
    });

    Posts.update(comment.postId, {
      $inc: {commentsCount: 1}, 
      $addToSet: {subscribers: user._id}
    });

    comment._id =  Comments.insert(comment);
    Meteor.call('createCommentNotificiation', comment);
    return comment._id;
  },
  uncomment: function(commentId){
    var comment = Comments.findOne(commentId);
    var user = Meteor.user();
    if (!comment || !user) 
      throw new Meteor.Error(401, "Comment or user does not exist");
    if (!(comment.realId == user._id || 
      (user && user.profile.type == "admin")))
      throw new Meteor.Error(401, 
        "You don't have permission to delete this comment");
    Comments.remove({
      _id: comment._id
    });
    Posts.update({
      _id: comment.postId
    },{
      "$inc": {
        commentsCount: -1
      }
    });
  }
});