// We're waiting a second because of this issue happen randomly
// https://github.com/cypress-io/cypress/issues/7306
// Also added custom types to avoid getting detached
// https://github.com/cypress-io/cypress/issues/7306#issuecomment-1152752612
// ===========================================================
function visitAndCheck(url, waitTime = 1000) {
  cy.visit(url);
  cy.location("pathname").should("contain", url).wait(waitTime);
}

Cypress.Commands.add("visitAndCheck", visitAndCheck);
