describe("App.Views.ContainerView", function () {
  
  before(function() {
    // create test fixture
    this.$fixture = $("<div id='container-view-fixture'></div>");
  });

  beforeEach(function() {
    // Empty out and rebind the fixture for each run
    this.$fixture.empty().appendTo($("#fixtures"));

    // New default model and view for each test
    //
    // Creation calls `render()`, so in tests we have an
    // already rendered view
    this.view = new App.Views.ContainerView({
      el: this.$fixture,
      model: new App.Models.Container()
    });
  });

  afterEach(function () {
    // Destroying the model also destroys the view
    this.view.model.destroy();
  });

  after(function() {
    // Remove all subfixtures after test suite finishes
    $("#fixtures").empty();
  });
});
