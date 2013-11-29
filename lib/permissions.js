ownsDocument = function(userId, doc) {
  return doc && doc.realId == userId;
};

// proxy for the Meteor method for easier server calling
isAdmin = function() {
  return Meteor.call("isAdmin");
};

