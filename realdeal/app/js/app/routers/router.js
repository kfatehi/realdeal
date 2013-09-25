(function () {
  'use strict';

  // Router
  // ------
  // The router translates routes in to views.
  App.Routers.Router = Backbone.Router.extend({

    // **Container**: Could wrap this up in functions to allow easier
    // stubbing of the underlying methods. But, there are some
    // definite Backbone.js efficiencies from using simple string
    // method names instead (like name inference, etc).
    routes: {
      "": "containers",
      "container/:id/:action": "container",
    },

    initialize: function (opts) {
      opts || (opts = {});
      this.containersView = opts.containersView || app.containersView;
      this.containerNavView = opts.containerNavView || app.containerNavView;

      // Validation.
      if (!this.containersView) { throw new Error("No containersView"); }
      if (!this.containerNavView) { throw new Error("No containerNavView"); }

      // Stash current container view for re-rendering.
      this.containerView = null;
    },

    // Show containers list.
    containers: function () {
      this.containersView.render();
    },

    // Common single container edit/view.
    container: function (containerId, action) {
      // Check if we are already at currently active view.
      if (this.containerView) {
        if (this.containerView.model.id === containerId) {
          // Reuse existing container view if same container.
          return this.containerView.trigger("update:" + action);
        } else {
          // Else, remove the last stored view.
          this.containerView.remove();
        }
      }

      // Try to find container in existing collection.
      var model = this.containersView.collection.get(containerId);
      if (!model) {
        // Go to home page on missing model.
        return this.navigate("", { trigger: true });
      }

      // Create container and add to DOM.
      this.containerView = new App.Views.Container({ model: model }, {
        action: action,
        nav: this.containerNavView
      });
      $("#container").html(this.containerView.render().$el);
    }

  });
}());
