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
  },
  tags: function() {
    return Tags.find();
  },
  isActiveTag: function(tagName) {
    if (_.contains(Session.get("tags"), tagName)) {
      return "&#8226; " + tagName;
    } else {
      return tagName;
    }
    
  }
});

Template.header.events({
  "click .tag": function(e) {
    var currentTags = Session.get("tags");
    if (_.contains(currentTags, this.name)) {
      Session.set("tags", _.without(currentTags, this.name));
    } else {
      Session.set("tags", _.union(currentTags, [this.name]));
    }
  }
});

