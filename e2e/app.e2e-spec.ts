import { AudGramPage } from './app.po';

describe('aud-gram App', function() {
  let page: AudGramPage;

  beforeEach(() => {
    page = new AudGramPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
