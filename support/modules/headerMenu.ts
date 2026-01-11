import { Page, Locator } from "playwright";
import { TopMenu } from "../enums/topMenuEnums.js";

export class HeaderMenu {
  private readonly page: Page;
  private readonly selector: string;

  constructor(page: Page, selector: string = ".header-menu") {
    this.page = page;
    this.selector = selector;
  }

  private booksTab = (): Locator =>
    this.page.locator('[href="/books"]').first();
  private computersTab = (): Locator =>
    this.page.locator('[href="/computers"]').first();
  private electronicsTab = (): Locator =>
    this.page.locator('[href="/electronics"]').first();
  private apparelTab = (): Locator =>
    this.page.locator('[href="/apparel-shoes"]').first();
  private digitalDownloadsTab = (): Locator =>
    this.page.locator('[href="/digital-downloads"]').first();
  private jewelryTab = (): Locator =>
    this.page.locator('[href="/jewelry"]').first();
  private giftsTab = (): Locator =>
    this.page.locator('[href="/gift-cards"]').first();

  private readonly topMenuLocators: Record<TopMenu, () => Locator> = {
    [TopMenu.Books]: this.booksTab,
    [TopMenu.Computers]: this.computersTab,
    [TopMenu.Electronics]: this.electronicsTab,
    [TopMenu.Apparel]: this.apparelTab,
    [TopMenu.DigitalDownloads]: this.digitalDownloadsTab,
    [TopMenu.Jewelry]: this.jewelryTab,
    [TopMenu.Gifts]: this.giftsTab,
  };

  async openTopMenu(tab: TopMenu): Promise<void> {
    const getLocator = this.topMenuLocators[tab];
    const locator = getLocator();
    await locator.click();
  }
}
