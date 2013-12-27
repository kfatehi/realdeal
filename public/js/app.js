App = {
  template: function(name, cb) {
    $.get('http://localhost:1337/templates/'+name+'.haml', function(src) {
      cb(haml.compileHaml({source: src}));
    });
  }
};

$(document).ready(function() {
  App.template('main', function(fn) {
    $('body').html(fn({appName: 'Realdeal'}));
  });
  // setup a router
  Backbone.history.start();
});
