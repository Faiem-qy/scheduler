describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("should book an interview", () => { 
    //Clicks on the "Add" button in the second appointment
    cy.get('[alt="Add"]')
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

  it("should edit an interview", () => { 
    // Clicks the edit button for the existing appointment
    cy.get('[alt="Edit"]')
      .first()
      .click({ force: true })
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Grand Poulet")
      cy.get('[alt="Tori Malcolm"]')
      .click();
    // Clicks the save button
    cy.contains(".button--confirm","Save")
      .click()
    // Sees the edited appointment
    cy.contains(".appointment__card--show", "Grand Poulet")
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => { 
    // Clicks the delete button for the existing appointment
    cy.get('[alt="Delete"]')
      .first()
      .click({ force: true })
    // Clicks the confirm button
    cy.contains(".button--danger","Confirm")
      .click()
    // Sees that the appointment slot is empty
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Grand Poulet")
      .should("not.exist");
  })


})
