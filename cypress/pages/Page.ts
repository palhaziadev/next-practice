class Page {
  getDropdownItem(text: string) {
    return text.length
      ? cy.contains('div[class^="Dropdown_item"]', text)
      : cy.get('div[class^="Dropdown_item"]');
  }

  getLanguageSwitcherItem(text: string) {
    return text.length
      ? cy.contains('div[class^="LanguageSwitcher"]', text)
      : cy.get('div[class^="LanguageSwitcher"]');
  }

  getAllDropdownItem() {
    return this.getDropdownItem('');
  }

  getAllLanguageSwitcherItem() {
    return this.getLanguageSwitcherItem('');
  }

  open(path: string) {
    return cy.visit(path);
  }
}

const PageInstance = new Page();
export { PageInstance };
export default Page;
