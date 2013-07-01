Template.postResolve.helpers({
  post: function() {
    return Posts.findOne(Session.get("currentPostId"));
  }
});

Template.postResolve.events({
  'submit form': function(e) {
    e.preventDefault();

    var postId = Session.get("currentPostId");
    var resolution = $(event.target).find("[name=resolution]").val();

    Posts.update(postId, {$set: {resolved: true, resolution: resolution}, $addToSet: {subscribers: Meteor.userId()}});

    Meteor.Router.to('postPage', postId);

    Meteor.call("createResolutionNotification", postId);
  }
});

