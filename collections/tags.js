Tags = new Meteor.Collection('tags');

Tags.allow({
  insert: isAdmin,
  update: isAdmin,
  remove: isAdmin
});
