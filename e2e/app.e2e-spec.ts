import { ProjetoModeloAngular2NodejsPage } from './app.po';

describe('projeto-modelo-angular2-nodejs App', function() {
  let page: ProjetoModeloAngular2NodejsPage;

  beforeEach(() => {
    page = new ProjetoModeloAngular2NodejsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
