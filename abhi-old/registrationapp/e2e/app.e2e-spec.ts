import { RegistrationappPage } from './app.po';

describe('registrationapp App', () => {
  let page: RegistrationappPage;

  beforeEach(() => {
    page = new RegistrationappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
