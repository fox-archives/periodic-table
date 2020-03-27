describe("page loads", () => {
  it("actually works", () => {
    cy.visit("/");
    cy.contains("Properties");
    cy.contains("Edwin Kofler");
    cy.contains("Hydrogen");
  });
});
