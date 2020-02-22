// https://docs.cypress.io/api/introduction/api.html

describe('Todo List', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the app root url', () => {
    cy.contains('h1', 'Todo');
  });

  it('Stores the list in local storage', () => {
    cy.expect(localStorage.getItem('todoList')).to.exist;
  });

  it('Removes an item from the list', () => {
    // 3 items, with table header row
    cy.get('.list table').find('tr').should('have.length', 4)
    cy.get('.remove-button i').last().click()
    // Now 2 items, with table header row
    cy.get('.list table').find('tr').should('have.length', 3)
  });

  it('Clears all items from the list', () => {
    cy.get('.list table').find('tr').should('have.length', 4)
    cy.get('.clear-all-button i').last().click()
    // 2 allows for the table header, and row saying all
    // todos are complete
    cy.get('.list table').find('tr').should('have.length', 2)
  });

  it('Orders by priority', () => {
    cy.get('.item-priority span').last().then((span) => {
      const text = span.text()
      expect(text).to.equal('Meh')
    })
    cy.get('.priority-toggle').click()
    cy.get('.item-priority span').last().then((span) => {
      const text = span.text()
      expect(text).to.equal('Life changing')
    })
  });
})
