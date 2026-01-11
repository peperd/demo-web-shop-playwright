import {Page, test} from '@playwright/test';
import {BasePage} from "./basePage.js";
import {CartItemRow} from "../modules/cartItemRow.js";

export class WishlistPage extends BasePage{
    private readonly cartItemRow: CartItemRow;

    constructor(page:Page) {
        super(page);
        this.cartItemRow = new CartItemRow(page);
    }

    async getAllItemLinks(): Promise<(string | null)[]> {
        return test.step('Get all items from wishlist', async () => {
            return this.cartItemRow.getAllItemLinks();
        })
    }

}