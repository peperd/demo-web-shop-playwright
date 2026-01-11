import { Page, selectors, test } from "@playwright/test";
import { BasePage } from "./basePage.js";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
