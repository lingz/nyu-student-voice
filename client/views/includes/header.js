Template.header.helpers({
  activeRouteClass: function(/* route names */) {

    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();    

    var active = _.any(args, function(name) {
      return location.pathname === Meteor.Router[name + 'Path']();
    });

    return active && 'active';
  },
  isAdmin: function() {
    return Session.get("admin");
  }
});

Template.header.events({
  "click .logout": function(e) {
    Meteor.logout();
    window.location = "https://accounts.google.com/logout";
  }
});
Template.header.rendered = function() {
  YUI({
      classNamePrefix: 'pure'
  }).use('gallery-sm-menu', function (Y) {

      var horizontalMenu = new Y.Menu({
          container         : '#demo-horizontal-menu',
          sourceNode        : '#std-menu-items',
          orientation       : 'horizontal',
          hideOnOutsideClick: false,
          hideOnClick       : false
      });

      horizontalMenu.render();
      horizontalMenu.show();

  });
}


  
