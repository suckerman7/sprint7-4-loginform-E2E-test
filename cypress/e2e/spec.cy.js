describe('Login Form Tests', () => {

 beforeEach(() => {
  cy.visit('http://localhost:5173'); // veya senin local adresin
  cy.request('https://6540a96145bedb25bfc247b4.mockapi.io/api/login'); // istersen bırakabilirsin
});

  it('Success sayfasına git', () => {
    cy.get('#data-email').type(('mrty.yksl@gmail.com'));
    cy.get('#data-password').type('Mertyuksel13579!');
    cy.get('#data-terms').check();

    cy.get('button[type="submit"]').should('not.be.disabled').click();

    cy.url().should('include', '/main');
    cy.contains('Login Successful').should('exist');
  });

  it('email yanlış girildi', () => {
    cy.get('#data-email').type(('yanlış email'));
    cy.get('#data-password').type('Mertyuksel13579!');
    cy.get('#data-terms').check();

    cy.get('.invalid-feedback').should('have-length', 1);
    cy.contains('Please enter a valid email address').should('exist');

    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('email ve şifre yanlış girildi', () => {
    cy.get('#data-email').type(('yanlış email'));
    cy.get('#data-password').type('mertyuksel');
    cy.get('#data-terms').check();

    cy.get('.invalid-feedback').should('have-length', 2);
    cy.contains('Password must be at least 8 characters long, needs at least one uppercase, number and special case letter.').should('exist');

    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('email ve şifre doğru, Terms tiklenmedi', () => {
    cy.get('#data-email').type(('mrty.yksl@gmail.com'));
    cy.get('#data-password').type('Mertyuksel13579!');

    cy.get('#data-terms').should('not-be-checked');

    cy.get('button[type="submit"]').should('be.disabled');
  });

});