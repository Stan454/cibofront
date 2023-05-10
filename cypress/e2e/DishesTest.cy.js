import { wait } from "@testing-library/user-event/dist/utils"

describe('Dishes page', () => {
  it('adds a new dish and verifies it appears in the table', () => {
    cy.visit('http://localhost:3000/dishes')

    // Fill out the form to add a new dish
    cy.get('input[name="name"]').type('New test dish by Cypress')
    cy.get('input[name="description"]').type('A delicious new dish')
    cy.get('select[name="dishCategory"]').select('1')
    cy.get('input[name="price"]').type('9.99')
    cy.get('#formS').submit()

    // Verify that the new dish appears in the table
    cy.contains('td', 'New test dish by Cypress')
      .should('exist')
      .parent()
      .within(() => {
        cy.contains('td', 'A delicious new dish').should('exist')
        cy.contains('td', 'Appetizers').should('exist')
        cy.contains('td', '9.99').should('exist')
      })
      cy.wait(5000);
  })
})

describe('Dishes page', () => {
  it('verifies dish appears in the table and deletes it', () => {
    cy.visit('http://localhost:3000/dishes')

    // Verify that the new dish appears in the table
    cy.contains('td', 'New test dish by Cypress')
      .should('exist')
      .parent()
      .within(() => {
        cy.contains('td', 'A delicious new dish').should('exist')
        cy.contains('td', 'Appetizers').should('exist')
        cy.contains('td', '9.99').should('exist')
        cy.contains('button', 'Delete').click() // Click on the delete button
      })

    // Verify that the dish is deleted and no longer appears in the table
    cy.contains('td', 'New test dish by Cypress').should('not.exist')
  })
})
