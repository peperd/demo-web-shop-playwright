import {Page, test} from "@playwright/test";
import {BasePage} from "./basePage.js";
import {CartItemRow} from "../modules/cartItemRow.js";
import {Locator} from "playwright";
import {ProductNames} from "../enums/productNamesEnums.js";

export class CartPage extends BasePage{
    readonly cartItemRow: CartItemRow
    constructor(page:Page){
        super(page);
        this.cartItemRow = new CartItemRow(page);
    }

    private cartTotal = (): Locator => this.page.locator('.order-total');
    private checkoutButton = (): Locator => this.page.locator('[name="checkout"]');
    private agreeCheckoutTerms = (): Locator => this.page.locator('[name="termsofservice"]');
    private checkoutAsAGuestButton = (): Locator => this.page.locator('.checkout-as-guest-button');

    getCartTotal(): Promise<number> {
        return test.step('Get cart total', async () => {
            const rawText = await this.cartTotal().innerText();

            const cleaned = rawText.replace(/[^\d.,-]/g, '').replace(',', '.');

            const num = parseFloat(cleaned);
            return Number.isNaN(num) ? 0 : num;

        })
    }

    getProductPrice(name: ProductNames): Promise<number> {
        return test.step(`Get actual price of ${name}`, async () => {
            return this.cartItemRow.getProductPrice(name)
        })
    }

    getProductQuantity(name: ProductNames): Promise<number> {
            return test.step(`Get quantity of ${name}`, async () => {
                return this.cartItemRow.getProductQuantity(name)
            })
        }

    getProductSubTotal(name: ProductNames): Promise<number> {
        return test.step(`Get subtotal of ${name}`, async () => {
            return this.cartItemRow.getProductSubtotal(name)
        })
    }

    async checkout(): Promise<void> {
        await this.agreeCheckoutTerms().waitFor()
        await this.agreeCheckoutTerms().check()
        await this.checkoutButton().click();
        await this.checkoutAsAGuestButton().click();
    }

}