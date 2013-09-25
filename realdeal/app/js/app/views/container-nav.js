(function () {
  'use strict';

  // Container Navigation Bar View
  // ------------------------
  // Controls container nav bar and emits navigation events.
  //
  // Listens to: events that trigger menu DOM updates.
  // * `nav:update:view`
  // * `nav:update:edit`
  //
  // Emits: events on menu clicks.
  // * `nav:view`
  // * `nav:edit`
  // * `nav:delete`
  App.Views.ContainerNav = Backbone.View.extend({

    el: "#container-nav",

    events: {
      "click .container-view":   "clickView",
      "click .container-edit":   "clickEdit",
      "click .container-delete": "clickDelete",
    },

    initialize: function () {
      // Defaults for nav.
      this.$("li").removeClass("active");

      // Update the navbar UI for view/edit (not delete).
      this.on({
        "nav:update:view": this.updateView,
        "nav:update:edit": this.updateEdit
      });
    },

    // Handlers for updating nav bar UI.
    updateView: function () {
      this.$("li").not(".container-view").removeClass("active");
      this.$(".container-view").addClass("active");
    },
    updateEdit: function () {
      this.$("li").not(".container-edit").removeClass("active");
      this.$(".container-edit").addClass("active");
    },

    // Handlers for emitting nav events.
    clickView: function () {
      this.trigger("nav:update:view nav:view");
      return false;
    },
    clickEdit: function () {
      this.trigger("nav:update:edit nav:edit");
      return false;
    },
    clickDelete: function () {
      this.trigger("nav:update:delete nav:delete");
      return false;
    }

  });
}());
