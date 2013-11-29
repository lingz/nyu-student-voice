Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && ! _.include(this.upvoters, userId)) {
      return 'btn-primary upvoteable';
    } else if (userId){
      return 'btn-success unvotable';
    } else {
      return "disabled";
    }
  },
  isAdmin: function() {
    return Session.get("admin");
  },
  canResolve: function() {
    return !(this.resolved);
  },
  canEdit: function() {
    return this.realId !== undefined;
  },
  resolvedStatus: function() {
    if (this.resolved) {
      return true;
    } else {
      return false;
    }
  },
  resolvedClass: function() {
    if (this.resolved) {
      return "btn-success";
    } else {
      return "btn-warning";
    }
  },
  hasPostTags: function() {
    return (this.tags !== undefined && this.tags.length > 0);
  }
});

Template.postItem.events({
  'click .upvoteable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id, function(err, resp){
      if (err) {
        console.log(err.reason);
      } else {
        console.log(resp);
      }
    });
  },
  'click .unvotable': function(e) {
    e.preventDefault();
    Meteor.call('unvote', this._id, function(err, resp){
      if (err) {
        console.log(err.reason);
      } else {
        console.log(resp);
      }
    });
  },
  'click .delete':  function(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this?")){
      Posts.remove(this._id, function(err) {
        Meteor.throwError(err.reason);
      });
    }
  }
});

Template.postItem.rendered = function(){
  // animate post from previous position to new position
  var instance = this;
  var rank = instance.data._rank;
  var $this = $(this.firstNode);
  var postHeight = 80;
  var newPosition = rank * postHeight;

  // if element has a currentPosition (i.e. it's not the first ever render)
  if (typeof(instance.currentPosition) !== 'undefined') {
    var previousPosition = instance.currentPosition;
    // calculate difference between old position and new position and send element there
    var delta = previousPosition - newPosition;
    $this.css("top", delta + "px");
  } else {
    // it's the first ever render, so hide element
    $this.addClass("invisible");
  }

  // let it draw in the old position, then..
  Meteor.defer(function() {
    instance.currentPosition = newPosition;
    // bring element back to its new original position
    $this.css("top",  "0px").removeClass("invisible");
  }); 
};

// make the upvoted look downvotable
$(function () {
  $(document).on({
    mouseenter: function() {
      var pin = $(event.target);
      pin.addClass("hovered");
      temp = pin.html();
      pin.html("Remove Vote");
      pin.addClass("btn-danger");
      pin.removeClass("btn-success");
      // bind a listener to see if you've moved out (b/c mouseleave doesn't work properly)
      $(window).bind("mousemove", function(event) {
        var target = $(event.target);
        if (!target.hasClass("hovered")) {
          var pin = $(".hovered");
          pin.html(temp);
          pin.removeClass("btn-danger");
          pin.removeClass("hovered");
          pin.addClass("btn-success");
          $(window).unbind("mousemove");
        }
      });
    }
  }, 'a.unvotable');
});
