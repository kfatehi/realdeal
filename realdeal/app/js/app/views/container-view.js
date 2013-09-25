(function () {
  'use strict';

  // Container View Pane
  // --------------
  // Render a single container pane for viewing.
  App.Views.ContainerView = Backbone.View.extend({

    template: _.template(App.Templates["template-container-view"]),

    initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);
      this.render();
    },

    // Convert container data into Markdown.
    render: function () {
      this.$el.html(this.template({
        title: this.model.get("title"),
        text: this.model.get("text")
      }));
      return this;
    }
  });
}());
