import type {} from 'cypress';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Landing Page');
  });
});
