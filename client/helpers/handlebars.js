Handlebars.registerHelper('pluralize', function(n, thing) {
  // lazy & basic pluralizer
  if (n === 1) {
    return '1 ' + thing ;
  } else {
    return n + ' ' + thing + 's';
  }
});
