// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Visits the app root url', () => {
    cy.contains('h1', 'Todo List');
  });
  it('Retrieves the todo list from local storage', () => {
    cy.expect(localStorage.getItem('todoList')).to.exist;
  });
})
