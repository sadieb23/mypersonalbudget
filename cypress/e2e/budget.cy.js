
//e2e test
describe('page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  context("home page", () => {
  it('should show validation errors when leaving all fields blank', () => {
    
    cy.get('[data-cy="createAccountButton"]').click();
    cy.get('[data-cy="loginButton"]').click();
  
  })
  /*context("index page", () => {
    it('should show validation errors when leaving all fields blank', () => {
      
      cy.get('[data-cy="budgetButton"]').click();
    
    })*/
  })
})



