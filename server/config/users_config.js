Accounts.loginServiceConfiguration.remove({
  service: "googleApps"
});
Accounts.loginServiceConfiguration.insert({
  service: "googleApps",
  clientId: process.env.googleId,
  secret: process.env.googleSecret,
  domain: "nyu.edu"
});

Accounts.onCreateUser(function(options, user) {
  if (!(user.services && user.services.googleApps &&
    user.services.googleApps.email)) {
    throw new Meteor.Error("Error: Not a Google Apps account!");
  }
  netId = /([A-Za-z]+[0-9]+)@nyu.edu/.exec(user.services.googleApps.email);
  if (!netId) {
    throw new Meteor.Error("Error: Account does not have valid netId!");
  }
  user.profile = {
    netId: netId[1]
  };
  return user;
});
