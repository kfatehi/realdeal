(function () {
  'use strict';

  // Container Model
  App.Models.Container = Backbone.Model.extend({
    defaults: function() {
      return {
        title: "",
        text: "*Edit me*",
        createdAt: new Date()
      };
    }
  });
}());
