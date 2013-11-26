Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var $anon = $(e.target).find('.anonymous-check');
    var comment = {
      body: $body.val(),
      postId: template.data._id,
      anonynmous: $anon.hasClass("checked")
    };

    Meteor.call('comment', comment, function(error, commentId) {
      if (error) {
        Meteor.Errors.throwError(error.reason);
        window.scrollTo(0, 0);
      } else {
        $body.val('');
      }
    });
    
  },
  "click .anonymous-check": function(e) {
    $anon = $(e.target);
    $anon.toggleClass("checked");
  }
});
