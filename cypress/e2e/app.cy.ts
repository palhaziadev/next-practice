import { PageInstance as Page } from '../pages/Page';

describe('App', () => {
  describe('Header', () => {
    it('should have theme selector with items', () => {
      Page.open('http://localhost:3000/');

      cy.contains('div', 'light').should('be.visible');
      cy.contains('div', 'light').click();

      Page.getAllDropdownItem().then((items) => {
        const lights: JQuery<HTMLElement>[] = [];
        cy.wrap(items).each((item) => {
          if (item.text() === 'light') {
            lights.push(item);
          }
        });

        expect(cy.wrap(lights).should('have.length', 2));
      });
      Page.getDropdownItem('dark').should('be.visible');
      Page.getDropdownItem('mario').should('be.visible');
    });

    it('should theme selector change theme', () => {
      Page.open('http://localhost:3000/');

      cy.contains('div', 'light').should('be.visible');
      cy.contains('div', 'light').click();

      cy.contains('div', 'dark').click();

      cy.get('html').should('have.attr', 'data-theme', 'dark');
    });

    it('should have language selector with items', () => {
      Page.open('http://localhost:3000/');

      cy.contains('div', 'English').should('be.visible');
      cy.contains('div', 'English').click();

      Page.getAllLanguageSwitcherItem().then((items) => {
        const lights: JQuery<HTMLElement>[] = [];
        cy.wrap(items).each((item) => {
          console.log('aaa text', item.text());
          if (item.text() === 'English') {
            lights.push(item);
          }
        });

        expect(cy.wrap(lights).should('have.length', 2));
        Page.getLanguageSwitcherItem('Español').should('be.visible');
        Page.getLanguageSwitcherItem('Magyar').should('be.visible');
      });
    });

    it('should language selector change language', () => {
      Page.open('http://localhost:3000/');

      cy.contains('div', 'English').should('be.visible');
      cy.contains('div', 'English').click();

      cy.contains('div', 'Español').click();

      cy.get('h1').contains('Hola Mundo!');
    });
  });

  describe('Root Page', () => {
    it('should have text Hello world!', () => {
      Page.open('http://localhost:3000/');

      cy.get('h1').contains('Hello world!');
    });
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
