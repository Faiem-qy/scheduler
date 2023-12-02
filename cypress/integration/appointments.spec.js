describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("should book an interview", () => { 
    cy.get(".appointment__add-button")
      .first()
      .click()
    // Enters their name
    cy.get("[data-testid=student-name-input]")
      .type("Petit Poulet")
    // Chooses an interviewer
    cy.get('[alt="Sylvia Palmer"]')
      .click();
    // Clicks the save button
    cy.contains(".button--confirm","Save")
      .click()
    // Sees the booked appointment
    cy.contains(".appointment__card-left", "Petit Poulet")
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

})
















































// it("should edit an interview", () => {
//   cy.get("[alt=Edit]")
//     .first()
//     .click({ force: true })

//   cy.get("[data-testid=student-name-input]")
//     .clear()
//     .type("Billy Bob")

//   cy.get('[alt="Tori Malcolm"]')
//     .click();

//   cy.contains(".button--confirm","Save")
//     .click()

//   cy.contains(".appointment__card-left", "Billy Bob")

// })