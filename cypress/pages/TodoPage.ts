import { TodoStatus } from '@/utils/constants';
import Page from './Page';

class TodoPage extends Page {
  private get modal() {
    return cy.get('#modal-portal');
  }

  private get addButton() {
    return cy.contains('button', 'Add Todo');
  }

  // Todo create Modal Class??
  private get modalTitle() {
    return cy.get('#modal-portal input');
  }
  private get modalDescription() {
    return cy.get('#modal-portal textarea');
  }
  private get modalSubmitBtn() {
    return cy.get('#modal-portal button').contains('Submit');
  }

  get viewSwitcher() {
    return cy.get('div[class^="ViewSwitcher"]');
  }

  get searchButton() {
    return cy.contains('button', 'Search');
  }

  get searchInput() {
    return cy.get('input[placeholder="Search Todo"]');
  }

  private isModalOpen(title: string) {
    cy.contains('h4', title, { timeout: 5000 }).should('be.visible');
  }

  private setTodoStatus(status: TodoStatus) {
    cy.get('#modal-portal div[class^="Dropdown_selected"]').click();
    cy.contains('#modal-portal div', status).click();
  }

  getTodoItemByTitle(title: string) {
    return cy
      .contains('div', title)
      .parents('div[class^="TodoItem_container"]');
  }

  open() {
    return super.open('http://localhost:3000/todo');
  }

  addTodo({
    title,
    description,
    status = TodoStatus.Created,
  }: {
    title: string;
    description?: string;
    status?: TodoStatus;
  }) {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    this.addButton.click();

    this.isModalOpen('New Todo');

    this.modalTitle.type(title);

    if (description) {
      this.modalDescription.type(description);
    }

    this.setTodoStatus(status);

    this.modalSubmitBtn.click();
  }

  removeTodo({ title }: { title: string }) {
    const itemRemoveIcon = this.getTodoItemByTitle(title).find('.TrashIcon');
    itemRemoveIcon.click();
  }

  modifyTodo({
    title,
    newTitle,
    newDesciption,
    newStatus,
  }: {
    title: string;
    newTitle?: string;
    newDesciption?: string;
    newStatus?: TodoStatus;
  }) {
    const item = this.getTodoItemByTitle(title);
    // TODO why wait is needed? without the 'wait' the click doesn't work
    // maybe bacause of the animation
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    item.click();

    this.isModalOpen('Modify Todo');

    if (newTitle) {
      this.modalTitle.clear();
      this.modalTitle.type(newTitle);
    }

    if (newDesciption) {
      this.modalDescription.type(newDesciption);
    }

    if (newStatus) {
      this.setTodoStatus(newStatus);
    }

    this.modalSubmitBtn.click();
  }
}

const todoPage = new TodoPage();
export default todoPage;
