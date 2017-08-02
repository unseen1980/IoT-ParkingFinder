import { IotParkfinderPage } from './app.po';

describe('iot-parkfinder App', () => {
  let page: IotParkfinderPage;

  beforeEach(() => {
    page = new IotParkfinderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
