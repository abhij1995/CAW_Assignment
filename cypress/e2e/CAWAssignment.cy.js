describe("CAW Assignment", function () {
  it("Add data to dynamic table and verify it with fixture data", () => {
    var sometext;
    var fixtureData;
    cy.readFile("cypress\\fixtures\\CAWdata.json").then((data) => {
      fixtureData = data;
      sometext = JSON.stringify(data);

      cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");
      cy.get("summary").click();
      cy.get("#jsondata")
        .clear()
        .type(sometext, { parseSpecialCharSequences: false });
    });
    cy.get("#refreshtable").click();

    cy.get("tr")
      .eq(0)
      .nextAll()
      .each(($el, index) => {
        let input =
          fixtureData[index].name +
          fixtureData[index].age +
          fixtureData[index].gender;
        assert.equal($el.text(), input);
      });
  });
});
