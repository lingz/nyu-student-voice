Template.postDetail.helpers({
  options: function() {
    var opts = {
      title: "Details",
      body: this.message
    };

    return opts;
  }
});

Template.postResolution.helpers({
  options: function() {
    var opts = {
      title: "Resolution",
      body: this.resolution
    };

    return opts;
  }
});

Template.postBody.helpers({
  titleColor: function(/* options object with title field */) {
    var args = Array.prototype.slice.call(arguments, 0); 
    args.pop();

    if (args[0] === "Resolution") {
      return "resolution";
    }
    if (args[0] === "Details") {
      return "details";
    }
  },
  body: function() {
    if (this.body && this.body.length > 0) {
      return this.body;
    } else {
      return "No details provided";
    }
  }
});
