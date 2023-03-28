import type {} from 'cypress';

describe('From admin to sign in', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3001');
  });

  it('successfully loads images', () => {
    cy.visit('http://localhost:3001');
    cy.get('img').should('exist');
  });

  it('Redirect to sign in page', () => {
    cy.visit('http://localhost:3001');
    cy.contains('My Account').click();
    cy.url().should('be.equal', 'http://localhost:3001/auth/sign-in');
  });

  it('Redirect to sign up page', () => {
    cy.visit('http://localhost:3001');
    cy.contains('Sign Up Now').click();
    cy.url().should('be.equal', 'http://localhost:3001/auth/sign-up');
  });
});

describe('Successfully access authorised only pages', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/auth/sign-in');
    cy.get('#user_email').type('bruce@diehard.me');
    cy.get('#password_hash').type('diehard');
    cy.contains('Sign In').click();
  });

  it('successfully loads dashboard', () => {
    cy.url().should(
      'be.equal',
      'http://localhost:3001/admin/yippie-kay-yay/dashboard'
    );
  });

});
