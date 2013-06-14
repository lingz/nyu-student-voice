Meteor.errors = new Meteor.Collection(null);

Meteor.Errors = {
  throwError: function(message) {
    Meteor.errors.insert({message: message, seen: false});
  },
  clear: function() {
    Meteor.errors.remove({seen: true});
  }
};
