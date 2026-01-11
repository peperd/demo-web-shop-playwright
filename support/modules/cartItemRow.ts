import { Locator, Page } from "@playwright/test";
import { ProductNames } from "../enums/productNamesEnums.js";

export class CartItemRow {
  private readonly page: Page;
  private readonly selector: string;
  constructor(page: Page, selector: string = ".cart-item-row") {
    this.page = page;
    this.selector = selector;
  }
  private selfSelector = (): Locator => this.page.locator(this.selector);
  private removeFromCartCheckbox = (): Locator =>
    this.page.locator('[name="removefromcart"]');
  private get unitePrice(): Locator {
    return this.page.locator(".product-unit-price");
  }
  private quantity = (): Locator => this.page.locator(".qty-input");
  private get subtotalPrice(): Locator {
    return this.page.locator(".product-subtotal");
  }

  getProductRow(name: ProductNames): Locator {
    return this.page.locator(`${this.selector}:has(a[href$="${name}"])`);
  }

  async getProductQuantity(name: ProductNames): Promise<number> {
    await this.getProductRow(name)
      .locator(this.quantity())
      .waitFor({ state: "visible" });
    const value = await this.getProductRow(name)
      .locator(this.quantity())
      .getAttribute("value");

    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
  }

  async getProductPrice(name: ProductNames): Promise<number> {
    const row = this.getProductRow(name);
    const priceLocator = row.locator(this.unitePrice);

    await priceLocator.waitFor({ state: "visible" });

    const priceValue = await priceLocator.textContent();
    const text = priceValue ?? "";

    const num = parseFloat(text.replace(/[^\d.,-]/g, "").replace(",", "."));
    return Number.isNaN(num) ? 0 : num;
  }

  async getProductSubtotal(name: ProductNames): Promise<number> {
    const row = this.getProductRow(name);
    const subtotalLocator = row.locator(this.subtotalPrice);

    await subtotalLocator.waitFor({ state: "visible" });

    const subtotalValue = await subtotalLocator.textContent();
    const text = subtotalValue ?? "";

    const parsed = parseFloat(text.replace(/[^\d.,-]/g, "").replace(",", "."));
    if (Number.isNaN(parsed)) {
      return 0;
    }

    return Math.round(parsed);
  }

  async getAllItemLinks(): Promise<(string | null)[]> {
    await this.selfSelector().waitFor();
    const rows: Locator[] = await this.selfSelector().all();
    return Promise.all(
      rows.map((row: Locator) => row.locator("a").getAttribute("href"))
    );
  }
}
