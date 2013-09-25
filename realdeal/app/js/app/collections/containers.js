(function () {
  'use strict';

  // Containers Collection
  App.Collections.Containers = Backbone.Collection.extend({
    model: App.Models.Container,
    localStorage: new Backbone.LocalStorage(App.Config.storeName)
  });
}());
