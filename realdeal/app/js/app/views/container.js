(function () {
  'use strict';

  // Container View
  // ---------
  // A single container.
  //
  // Contains:
  // * App.Views.ContainerNav: Helper view for navigation events.
  // * App.Views.ContainerView: Child view for rendering Markdown.
  //
  App.Views.Container = Backbone.View.extend({

    id: "container-panes",

    template: _.template(App.Templates["template-container"]),

    events: {
      "blur   #container-form-edit": "saveContainer",
      "submit #container-form-edit": function () { return false; }
    },

    initialize: function (attrs, opts) {
      // Default to empty options.
      opts || (opts = {});

      // Add member variables.
      //
      // Router can be set directly (e.g., tests), or use global.
      // The `app.router` object *does* exist at this point.
      this.nav = opts.nav;
      this.router = opts.router || app.router;

      // Verification.
      // -- Line Omitted in Book. --
      if (!this.router) { throw new Error("No router"); }

      // Add our custom listeners.
      this._addListeners();

      // Render HTML, update to action, and show container.
      this.$el.html(this.template(this.model.toJSON()));
      this.update(opts.action || "view");
      this.render();

      // Add in viewer child view (which auto-renders).
      this.containerView = new App.Views.ContainerView({
        el: this.$("#container-pane-view-content"),
        model: this.model
      });
    },

    // Helper listener initialization method.
    _addListeners: function () {
      // Model controls view rendering and existence.
      this.listenTo(this.model, {
        "destroy": function () { this.remove(); },
        "change":  function () { this.render().model.save(); }
      });

      // Navbar controls/responds to panes.
      this.listenTo(this.nav, {
        "nav:view":   function () { this.viewContainer(); },
        "nav:edit":   function () { this.editContainer(); },
        "nav:delete": function () { this.deleteContainer(); }
      });

      // Respond to update events from router.
      this.on({
        "update:view": function () { this.render().viewContainer(); },
        "update:edit": function () { this.render().editContainer(); }
      });
    },

    // Rendering the container is simply showing the active pane.
    // All HTML should already be rendered during initialize.
    render: function () {
      $(".region").not(".region-container").hide();
      $(".region-container").show();
      return this;
    },

    remove: function () {
      // Remove child, then self.
      this.containerView.remove();
      Backbone.View.prototype.remove.call(this);
    },

    // Update internal "action" state (view or edit).
    update: function (action) {
      action = action || this.action || "view";
      var paneEl = "#container-pane-" + action,
        loc = "container/" + this.model.id + "/" + action;

      // Ensure menu bar is updated.
      this.nav.trigger("nav:update:" + action);

      // Show active pane.
      this.$(".pane").not(paneEl).hide();
      this.$(paneEl).show();

      // Store new action and navigate.
      if (this.action !== action) {
        this.action = action;
        this.router.navigate(loc, { replace: true });
      }
    },

    // Activate "view" or "edit" container panes.
    viewContainer: function () {
      this.update("view");
    },
    editContainer: function () {
      this.update("edit");
    },

    // Delete model (causes view removal) and navigate to
    // "all containers" list page.
    deleteContainer: function () {
      if (confirm("Delete container?")) {
        this.model.destroy();
        this.router.navigate("", { trigger: true, replace: true });
      }
    },

    // Save container (triggering model change).
    saveContainer: function () {
      this.model.set({
        title: this.$("#input-title").val().trim(),
        text: this.$("#input-text").val().trim()
      });
    }

  });
}());
