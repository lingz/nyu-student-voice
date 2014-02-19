Meteor.Router.add({
  '/': {to: 'topPosts', as: 'home'},
  '/new': 'newPosts',
  '/top': 'topPosts',
  '/resolved': 'resolvedPosts',
  '/users': 'userList',
  '/tags': 'tagsAdminList',
  '/posts/:_id': {
    to: 'postPage',
    and: function(id) { Session.set('currentPostId', id); }
  },
  '/posts/:_id/edit': {
    to: 'postEdit',
    and: function(id) { Session.set('currentPostId', id);}
  },
  '/posts/:_id/resolve': {
    to: 'postResolve',
    and: function(id) { Session.set('currentPostId', id);}
  },
  '/submit': 'postSubmit',
  "/logout": function() {
    Meteor.logout();
    window.location = "https://accounts.google.com/logout";
  }
});

Meteor.Router.filters({
  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loading';
    else
      return 'accessDenied';
  },
  'clearErrors': function(page) {
    Meteor.userError.clear();
    return page;
  }
});

Meteor.Router.filter('requireLogin', {only: 'postSubmit'});
Meteor.Router.filter('clearErrors');
