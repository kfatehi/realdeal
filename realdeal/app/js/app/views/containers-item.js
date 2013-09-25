(function () {
  'use strict';

  // Containers Item View
  // ---------------
  // A single container within a list of containers.
  App.Views.ContainersItem = Backbone.View.extend({

    // Set rendered DOM element `id` property to the model's id.
    id: function () { return this.model.id; },

    tagName: "tr",

    className: "containers-item",

    template: _.template(App.Templates["template-containers-item"]),

    events: {
      "click .container-view":   function () { this.viewContainer(); },
      "click .container-edit":   function () { this.editContainer(); },
      "click .container-delete": function () { this.deleteContainer(); }
    },

    initialize: function (attrs, opts) {
      // Get router from options or app. Also allow to be empty
      // so that tests can `render` without.
      opts || (opts = {});
      this.router = opts.router || app.router;

      this.listenTo(this.model, {
        "change":   function () { this.render(); },
        "destroy":  function () { this.remove(); }
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    viewContainer: function () {
      var loc = ["container", this.model.id, "view"].join("/");
      this.router.navigate(loc, { trigger: true });
    },

    editContainer: function () {
      var loc = ["container", this.model.id, "edit"].join("/");
      this.router.navigate(loc, { trigger: true });
    },

    deleteContainer: function () {
      // Destroying model triggers view cleanup.
      this.model.destroy();
    }

  });
}());
