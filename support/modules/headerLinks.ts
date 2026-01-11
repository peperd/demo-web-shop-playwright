import { Page, Locator } from "@playwright/test";

export class HeaderLinks {
  private readonly page: Page;
  private readonly selector: string;

  constructor(page: Page, selector: string = ".header-links") {
    this.page = page;
    this.selector = selector;
  }

  private register = (): Locator => this.page.locator(".ico-register").first();
  private login = (): Locator => this.page.locator(".ico-login").first();
  private shoppingCart = (): Locator =>
    this.page.locator("#topcartlink").first();
  private wishlist = (): Locator => this.page.locator(".ico-wishlist").first();

  async openShoppingCart(): Promise<void> {
    await this.shoppingCart().click();
  }

  async openWishList(): Promise<void> {
    await this.wishlist().click();
  }

  async hoverShoppingCart(): Promise<void> {
    await this.shoppingCart().hover();
  }
}
