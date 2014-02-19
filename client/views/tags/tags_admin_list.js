Template.tagsAdminList.events({
  "submit #new-tag": function(e) {
    e.preventDefault();
    var tagName = $("#new-tag-input");
    
    if (tagName.val().length === 0) {
      Meteor.userError.throwError("Your tag name can't be empty");
      return;
    }
    Tags.insert({
      name: tagName.val()
    });
    tagName.val("");
  }
});

Template.tagsAdminList.helpers({
  "tags": function() {
    return Tags.find();
  }
});
