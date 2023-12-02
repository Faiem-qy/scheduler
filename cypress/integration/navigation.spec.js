describe("Navigation", () => {
 it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")//identifying that we want the <li> element that contains "Tuesday"
      .click()
      .should("have.class", "day-list__item--selected");
  });

});
