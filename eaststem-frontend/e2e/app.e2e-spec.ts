import { RestClientPage } from './app.po';

describe('rest-client App', function() {
  let page: RestClientPage;

  beforeEach(() => {
    page = new RestClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
