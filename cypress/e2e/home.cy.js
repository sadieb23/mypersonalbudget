context('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should have "Create a personal budget today!"', () => {
    cy.get('h1').contains('Create a personal budget today!');
  });


  it('should look the same', () => {
   
    // Open Applitools Eyes
    cy.eyesOpen({
      appName: 'My App',
      testName: 'Homepage Check',
    });

    // Take a screenshot
    cy.eyesCheckWindow();

    // Close Applitools Eyes
    cy.eyesClose();
  });
});
