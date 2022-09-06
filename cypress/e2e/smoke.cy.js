describe("smoke tests", () => {
  it("should pass", () => {
    cy.visitAndCheck("/");
  });
});
