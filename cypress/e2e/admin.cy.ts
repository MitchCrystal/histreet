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

  it('successfully retrieve username', () => {
    cy.get('h4').contains('Welcome back').wait;
    cy.should('exist');
  });

  it('successfully retrieve revenue', () => {
    cy.get('div').contains('£').wait;
    cy.should('contain', Number);
  });
  it('successfully retrieve orders and customers', () => {
    cy.get('text-lg').wait;
    cy.should('contain', Number);
  });
  it('successfully renders graphs', () => {
    cy.get('canvas').should('be.visible');
  });
});

describe('Check the orders page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/auth/sign-in');
    cy.get('#user_email').type('bruce@diehard.me');
    cy.get('#password_hash').type('diehard');
    cy.contains('Sign In').click();
    cy.get('nav').contains('Orders').click();
    cy.url().should(
      'be.equal',
      'http://localhost:3001/admin/yippie-kay-yay/orders'
    );
  });

  it('successfully renders orders page on click from nav bar', () => {
    cy.get('nav').contains('Orders').click();
    cy.url().should(
      'be.equal',
      'http://localhost:3001/admin/yippie-kay-yay/orders'
    );
  });

  it('successfully retrieves orders from database', () => {
    cy.get('a').wait;
    cy.should('exist');
  });

  it('successfully redirects to order item details on click', () => {
    cy.get('td>a:first').click();
    cy.url().should(
      'be.equal',
      'http://localhost:3001/admin/yippie-kay-yay/order/order-with-1-item-some-cost'
    );
  });
});

describe('check the order item page', () =>{
  before(() =>{
    cy.visit('http://localhost:3001/auth/sign-in');
    cy.get('#user_email').type('bruce@diehard.me');
    cy.get('#password_hash').type('diehard');
    cy.contains('Sign In').click();
    cy.get('nav').contains('Orders').click();
    cy.get('td>a:first').click();
  })

  it('successfully renders order details', () => {
    cy.get('h1').contains('#').should('exist');
  })
})
