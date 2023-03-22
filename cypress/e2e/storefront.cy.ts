import type {} from 'cypress';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/my-store');
    cy.get('button').should('contain', 'Shop now');
  });
});
