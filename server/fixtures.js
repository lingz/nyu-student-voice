if (Posts.find().count() === 0) {
  var now = Date();
  
  var id = Accounts.createUser({
    username: "admin",
    email: "lz781@nyu.edu",
    password: "nyuad"
  });

	var admin = Meteor.users.findOne(id);
	Meteor.users.update(id, {$set: {"profile.type": "admin"}});
	


  // seed the db with samples
  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: admin.username,
      userId: admin._id,
      submitted: now - i * 3600 * 1000,
      commentsCount: 0,
      upvoters: [], votes: 0,
      resolved: false
    });
  }

}
