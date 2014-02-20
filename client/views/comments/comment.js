Template.comment.helpers({
  submittedText: function() {
  	var date = new Date(this.submitted);
  	date = moment(date).format('MMMM Do YYYY, h:mm a');
  	return date
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