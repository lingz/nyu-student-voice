Template.postSubmit.events({
  'submit form': function(event) {
    event.preventDefault();

    var post = {
      title: $(event.target).find('[name=title]').val(),
      message: $(event.target).find('[name=message]').val(),
      anonymous: $(event.target).find('.anonymous-check').hasClass("checked")
    };

    Meteor.call('post', post, function(error, id){
      if (error){
        Meteor.Errors.throwError(error.reason);

        if (error.error === 302) {
          Meteor.Router.to('postPage', error.details);
        }
      } else {
        Meteor.Router.to('postPage', id);
      }
    });
  },
  "click .anonymous-check": function(e) {
    $anon = $(e.target);
    $anon.toggleClass("checked");
  }
});

