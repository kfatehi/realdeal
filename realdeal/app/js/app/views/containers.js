(function () {
  'use strict';

  var ENTER = 13;

  // Containers View
  // ----------
  // Displays a list of containers.
  //
  // Contains:
  // * App.Views.ContainersFilter: Helper view for query filter.
  // * App.Views.ContainersItem: Child view for single container listing.
  //
  App.Views.Containers = Backbone.View.extend({

    el: "#containers",

    events: {
      "click    #container-create": function () {
        this.createContainer();
      },
      "keypress #container-new-input": function (ev) {
        this.enterContainer(ev);
      }
    },

    initialize: function () {
      // Cache view and just show on re-render.
      this.$input = this.$("#container-new-input");
      this.$form_errors = this.$('#container-new-errors');

      // Add containers when we get data.
      //
      // **Container**: This has to come **before** the filter view
      // instantiation which relies on `addContainer` creating a DOM
      // element first in its events. Brittle, but simpler for this
      // demonstration.
      //
      this.listenTo(this.collection, {
        "reset":     function ()  { this.addContainers(); },
        "containers:add": function (m) { this.addContainer(m); }
      });

      /* Create helper filter view.
      this.filterView = new App.Views.ContainersFilter({
        collection: this.collection
      });
      */

      // Need the collection to be fetched to kick off adding containers.
      // This is currently done in "app.js"
    },

    render: function () {
      // Show appropriate region.
      $(".region").not(".region-containers").hide();
      $(".region-containers").show();
      return this;
    },

    // Add single child container view to front of notes list.
    addContainer: function (model) {
      var view = new App.Views.ContainersItem({ model: model });

      this.$("#containers-list tr").first()
        .after(view.render().$el);
    },

    // Clear and add all containers to notes list.
    addContainers: function () {
      // Clear existing child container items.
      this.$("#containers-list tr.notes-item").remove();

      // Add all containers from collection, sorted old to new.
      this.collection.chain()
        .sortBy(function (m) { return m.get("createdAt"); })
        .each(this.addContainer, this);
    },

    // Create container on enter key.
    enterContainer: function (ev) {
      if (ev.which === ENTER) {
        this.createContainer();
      }
    },

    createContainer: function () {
      // Get value, then reset container input.
      var input = this.$input.val().trim();

      // Reset error text
      this.$form_errors.html('');

      if (input) {
        this.$form_errors.html('Locating...');
        this.create(input);
      }
    },

    create: function (title) {
      var input = this.$input;
      var errors = this.$form_errors;
      var coll = this.collection;

      // Add new model to collection, and corresponding container
      // to DOM after model is saved.
      coll.create({ title: title }, {
        success: function (colData, modelData) {
          // Clear input
          input.val("");

          // Clear errors
          errors.html("");

          // Trigger event on model retrieved from collection.
          coll.trigger("containers:add", coll.get(modelData.id));
        },
        error: function (jqXHR, textStatus, errorThrown) {
          errors.html(textStatus.responseJSON.error);
        }
      });
    }

  });
}());
