Template.postSubmit.events({
  'submit form': function(event) {
    event.preventDefault();

    var post = {
      title: $(event.target).find('[name=title]').val(),
      message: $(event.target).find('[name=message]').val(),
      tags: $(event.target).find('[name=tags]:checked').map(function() {return this.value;}).toArray()
    };

    if (this == window) {
      var anonymous = $(event.target).find('[name=anon]').is(':checked');
      post.anonymous = anonymous;

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
    } else {
      var currentPostId = this._id;
      Posts.update(this._id, {$set: post}, function(error) {
        if (error) {
          Meteor.Errors.throwError(error.reason);
        } else {
          Meteor.Router.to('postPage', currentPostId);
        }
      });
    }
  },
  "click .anonymous-check": function(e) {
    $anon = $(e.target);
    $anon.toggleClass("checked");
  }
});

Template.postSubmit.helpers({
  "tags": function() {
    return Tags.find();
  },
  "notEditing": function() {
    return this == window;
  },
  "tagExists": function(parentScope) {
    return _.contains(parentScope.tags, this.name) ? "checked" : "";
  }
});
