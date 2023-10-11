import { TodoStatus } from '@/utils/constants';
import TodoPage from '../pages/TodoPage';

describe('Todo Page', () => {
  it('should add new todo', () => {
    TodoPage.open();
    const title = 'POM test';

    TodoPage.addTodo({ title: title, status: TodoStatus.InProgress });
    cy.contains('div', title).should('be.visible');
  });

  it('should modify todo', () => {
    TodoPage.open();
    const title = 'new Title';
    TodoPage.modifyTodo({
      title: 'POM test',
      newTitle: 'new Title',
      newDesciption: 'new description',
      newStatus: TodoStatus.Done,
    });
    cy.contains('div', title).should('be.visible');
  });

  // skip until I have created a test db in Firebase
  it.skip('should add new todo with description', () => {
    TodoPage.open();
    const title = 'POM test desc';

    TodoPage.addTodo({
      title: title,
      description: 'test description',
      status: TodoStatus.Blocked,
    });

    cy.contains('div', title).should('be.visible');
  });

  it('should remove todo', () => {
    TodoPage.open();
    const title = 'new Title';
    TodoPage.removeTodo({ title: title });
    cy.contains('div', title).should('not.exist');
  });

  it('should add and remove todo', () => {
    TodoPage.open();
    const title = 'POM test add+remove';
    TodoPage.addTodo({ title: title, status: TodoStatus.InProgress });
    cy.contains('div', title).should('be.visible');

    TodoPage.removeTodo({ title: title });
    cy.contains('div', title).should('not.exist');
  });

  it('should toggle grid and list view', () => {
    TodoPage.open();
    TodoPage.viewSwitcher.click();
    cy.get('div[class^="TodoList_column"]').should('have.length', 4);

    TodoPage.viewSwitcher.click();
    cy.get('div[class^="TodoList_column"]').should('have.length', 1);
  });

  it('should search for text "12345678987654321" trigger search with {enter} key and get empty result', () => {
    TodoPage.open();

    TodoPage.searchInput.click();
    TodoPage.searchInput.type('12345678987654321{enter}');

    cy.contains('div', 'No Items').should('be.visible');
  });

  it('should search for text "POM test" trigger search with {Search button} and get one element as result', () => {
    TodoPage.open();

    const title = 'POM test';

    TodoPage.addTodo({
      title: title,
      status: TodoStatus.Created,
    });
    cy.contains('div', title).should('be.visible');

    TodoPage.searchInput.click();
    TodoPage.searchInput.type(`${title}{enter}`);

    cy.contains('div', title).should('be.visible');

    TodoPage.searchInput.click();
    TodoPage.searchInput.clear();

    cy.get('div[class^="TodoItem_container"]').should('have.length', 1);

    TodoPage.searchButton.click();

    cy.get('div[class^="TodoItem_container"]').should(
      'have.length.greaterThan',
      1
    );

    TodoPage.getTodoItemByTitle(title).scrollIntoView();

    TodoPage.removeTodo({ title: title });
    cy.contains('div', title).should('not.exist');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
