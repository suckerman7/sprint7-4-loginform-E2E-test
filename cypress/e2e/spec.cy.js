describe('Login Form Tests', () => {

 beforeEach(() => {
    cy.intercept('GET', '/api/login', mockUsers).as('getUsers');
    cy.visit('http://localhost:5173/');
  });

  it('Success sayfasına git', () => {
    cy.get('#data-email').type('test@test.com');
    cy.get('#data-password').type('Aa123456!');
    cy.get('#data-terms').check();

    cy.get('button[type="submit"]')
      .should('not.be.disabled')
      .click();

    cy.url().should('include', '/main');
    cy.contains('Login Successful').should('exist');
  });

  it('email yanlış girildi', () => {
    cy.get('#data-email').type('yanlis email');
    cy.get('#data-password').type('Aa123456!');
    cy.get('#data-terms').check();

    cy.get('.invalid-feedback').should('have.length', 1);

    cy.contains('Please enter a valid email address').should('exist');

    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('email ve şifre yanlış girildi', () => {
    cy.get('#data-email').type('yanlis email');
    cy.get('#data-password').type('1234');
    cy.get('#data-terms').check();

    cy.contains('Password must be at least 8 characters long, needs at least one uppercase, number and special case letter.').should('exist');
    cy.get('.invalid-feedback').should('have.length', 2);


    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('email ve şifre doğru, Terms tiklenmedi', () => {
    cy.get('#data-email').type('test@test.com');
    cy.get('#data-password').type('Aa123456!');

    cy.get('#data-terms').should('not.be.checked');

    cy.get('button[type="submit"]').should('be.disabled');
  });

});