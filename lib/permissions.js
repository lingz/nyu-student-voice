ownsDocument = function(userId, doc) {
  return doc && doc.userId == userId;
};

// proxy for the Meteor method for easier server calling
isAdmin = function() {
  return Meteor.call("isAdmin");
};

