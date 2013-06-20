Template.postEdit.helpers({
  post: function() {
    return Posts.findOne(Session.get('currentPostId'));
  }
}); 

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = Session.get('currentPostId');

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    };

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        Meteor.Errors.throwError(error.reason);
      } else {
        Meteor.Router.to('postPage', currentPostId);
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = Session.get('currentPostId');
      Posts.remove(currentPostId);
      Meteor.Router.to('postsList');
    }
  }
});
