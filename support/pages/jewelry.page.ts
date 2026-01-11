import { Page } from "@playwright/test";
import { BasePage } from "./basePage.js";
import { TopMenuUrl } from "../enums/topMenuUrls.js";

export class JewelryPage extends BasePage {
  protected readonly url: string;
  constructor(page: Page) {
    super(page);
    this.url = `${this.baseUrl}${TopMenuUrl.Jewelry}`;
  }
}
