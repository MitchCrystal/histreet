import type {} from 'cypress';

const TEST_URL = 'toothbrushes-etc';

describe('check links in landing page', () => {
  it('Redirect to products page with button in Hero image', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}`);
    cy.contains('Shop now').click();
    cy.url().should('include', '/products');
  });

  it('Redirect to products page', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}`);
    cy.contains('Products').click();
    cy.url().should('include', '/products');
  });
});

describe('check card slider', () => {
  it('should open cart slider when click in landing page', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}`);
    cy.contains('Cart').click();
    cy.get('h2').should('contain', 'Your cart');
  });

  it('should open cart slider when click in products page', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.contains('Cart').click();
    cy.get('h2').should('contain', 'Your cart');
  });

  it('should close cart slider when click in products page', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.contains('Cart').click();
    cy.get('svg:last').click();
    cy.get('body').should('not.contain', 'Your cart');
  });

  it('should show start shopping button when no items in cart', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}`);
    cy.contains('Cart').click();
    cy.get('Button').should('contain', 'shopping');
  });

  it('should redirect to products page when click button in cart slider', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}`);
    cy.contains('Cart').click();
    cy.contains('Start shopping').click();
    cy.url().should('include', '/products');
  });

  it('should show view full cart button and checkout button when any item is in the cart', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.get('img:first').click();
    cy.contains('Add to Cart').click();
    cy.get('nav').contains('Cart').click();
    cy.get('body').should('contain', 'View full cart');
    cy.get('body').should('contain', 'Checkout');
  });

  it('should be able to change quantity in the cart', () => {
    cy.viewport('macbook-16');
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.get('img:last').click();
    cy.contains('Add to Cart').click();
    cy.get('nav').contains('Cart').click();
    cy.get('input:last').click().type('2');
    cy.get('body').should('contain', '2 items');
  });

  it('should redirect to right page when click buttons', () => {
    cy.viewport('macbook-16');
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.get('img:last').click();
    cy.contains('Add to Cart').click();
    cy.get('nav').contains('Cart').click();
    cy.contains('View full cart').click();
    cy.url().should('include', '/cart');
    cy.get('nav').contains('Cart').click();
    cy.get('[role="dialog"]').contains('Checkout').click();
    cy.url().should('include', '/checkout');
  });
});

describe('check product purchase flow', () => {
  it('should not add items more than inventory stock', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.get('img:last').click();
    cy.get('input:last').click().type('2');
    cy.contains('Add to Cart').click();
    cy.get('body').should('contain', 'Not enough items in stock');
    cy.get('input').should('have.value', '1');
  });

  it('should adjust quantity of items', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.get('*[class^="grid"]').get('img:first').click();
    cy.get('input').click().clear().type('3');
    cy.contains('Add to Cart').click();
  });

  it('should be able to delete item from cart page', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.get('*[class^="grid"]').get('img:first').click();
    cy.get('input').click().clear().type('3');
    cy.contains('Add to Cart').click();
    cy.get('nav').contains('Cart').click();
    cy.contains('View full cart').click();
    cy.get('[class="w-6 text-red-500"]').click();
    cy.get('body').should('not.contain', '[class="w-6 text-red-500"]');
    cy.get('body').should('contain', 'Your cart is empty');
  });

  it('should be able to adjust quantity of items in cart page', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.get('*[class^="grid"]').get('img:first').click();
    cy.get('input').click().clear().type('1');
    cy.contains('Add to Cart').click();
    cy.get('nav').contains('Cart').click();
    cy.contains('View full cart').click();
    cy.get('input:last').click().type('2');
    cy.get('button:last').should('contain', '12 items');
  });

  it.only('should adjust quantity of items', () => {
    cy.visit(`http://localhost:3000/${TEST_URL}/products`);
    cy.get('*[class^="grid"]').get('img:first').click();
    cy.get('input').click().clear().type('3');
    cy.contains('Add to Cart').click();
    cy.get('nav').contains('Cart').click();
    cy.contains('View full cart').click();
    cy.get('button').contains('Checkout').click();
    cy.url().should('include', '/checkout');
  });
});
