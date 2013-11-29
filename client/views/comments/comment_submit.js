Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var $anon = $(e.target).find('[name=anon]');
    console.log($anon);
    console.log($anon.is(':checked'));
    var comment = {
      body: $body.val(),
      postId: template.data._id,
      anonymous: $anon.is(':checked')
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
});
