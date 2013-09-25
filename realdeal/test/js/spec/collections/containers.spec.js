describe("App.Collections.Containers", function () {
  
  before(function(){
    // Create a reference for all internal suites/specs
    this.containers = new App.Collections.Containers();

    // Use internal method to clear out existing data.
    this.containers.localStorage._clear();
  });

  after(function(){
    // Remove the reference
    this.containers = null
  });

  describe("creation", function () {
    
    it("has default values", function(){
      expect(this.containers).to.be.ok;
      expect(this.containers).to.have.length(0);
    });
    
    it("should be empty on fetch", function (done) {
      // stash reference to save context
      var containers = this.containers;

      // before fetch
      expect(containers).to.be.ok;
      expect(containers).to.have.length(0);

      // after fetch
      containers.once("reset", function(){
        expect(containers).to.have.length(0);
        done();
      });

      containers.fetch({ reset: true });
    });
  });

  describe("modification", function () {

    beforeEach(function () {
      // Load a pre-existing container.
      this.containers.create({
        name: "test"
      });
    });

    afterEach(function(){
      // Wipe internal data and reset collection
      this.containers.localStorage._clear();
      this.containers.reset();
    });

    it("has a single container", function(done){
      var containers = this.containers, container;

      // after fetch
      containers.once("reset", function(){
        expect(containers).to.have.length(1);

        // check model attributes
        container = containers.at(0);
        expect(container).to.be.ok;
        expect(container.get("name")).to.equal("test");
        done();
      });

     containers.fetch({ reset: true })
    });

    it("can delete a container", function(done){
      var containers = this.containers, container;
      
      // after shift
      containers.once("remove", function(){
        expect(containers).to.have.length(0);
        done();
      });

      // remove and return first model
      container = containers.shift();
      expect(container).to.be.ok;
    });
  })
})
