Template.postResolve.helpers({
  post: function() {
    return Posts.findOne(Session.get("currentPostId"));
  }
});

Template.postResolve.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentId = Session.get("currentPostId");
    var resolution = $(event.target).find("[name=resolution]").val();

    Posts.update(currentId, {$set: {resolved: true, resolution: resolution}});

    Meteor.Router.to('postPage', currentId);


  }
});

