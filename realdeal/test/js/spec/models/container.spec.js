describe("App.Models.Container", function() {
  it ("has default values", function() {
    var model = new App.Models.Container();

    expect(model).to.be.ok;
    expect(model.get("_id")).to.equal("");
    expect(model.get("name")).to.equal("");
    expect(model.get("updatedAt")).to.be.a("date");
  });

  it ("sets passed attributes", function() {
    var model = new App.Models.Container({
      name: "test",
      _id: "123"
    });

    expect(model).to.be.ok;
    expect(model.get("name")).to.equal("test");
    expect(model.get("_id")).to.equal("123");
  })
})
