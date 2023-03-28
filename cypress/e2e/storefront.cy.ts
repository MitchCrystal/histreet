import type {} from 'cypress';

describe('template spec', () => {
  it('page redirects to admin splash page', () => {
    cy.visit('http://localhost:3000');
    cy.visit('http://localhost:3001');
    
  });
 
});
