Template.comment.helpers({
  submittedText: function() {
    return new Date(this.submitted).toString();
  },
  canDelete: function() {
    return this.realId == Meteor.userId() || 
      (Meteor.user() && Meteor.user().profile.type == "admin");
  }
});

Template.comment.events({
	"click a.delete": function(event){
		event.preventDefault();
		Meteor.call("uncomment", this._id, function(err, resp) {
			if (err)
				Meteor.userError.throwError(err.reason);
		});
	}
})