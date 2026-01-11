import {Page} from '@playwright/test';
import {Locator} from "playwright";
import {ProductNames} from "../enums/productNamesEnums.js";

export class ProductItem {
    private readonly page: Page;
    private readonly selector: string;
    constructor(page:Page, selector:string ='.product-item'){
        this.page = page;
        this.selector = selector;
    }
    private productTitle  = (): Locator => this.page.locator('.product-title');
    private actualPrice = (): Locator => this.page.locator('.actual-price');
    private addToCartButton = (): Locator => this.page.locator('.buttons');
    private submitToCartButton = (): Locator => this.page.locator('.add-to-cart-button');
    private wishListButton = (): Locator => this.page.locator('.add-to-wishlist-button');

    getProductItem(name: ProductNames): Locator {
        return this.page.locator(
            `${this.selector}:has(a[href$="${name}"])`
        );
    }

    async getProductPrice(name: ProductNames): Promise<number> {
        const priceValue =  await this.getProductItem(name).locator('.actual-price').innerText();
        return Number(priceValue);
    }

    getProductAddToCartButton(name: ProductNames): Locator {
        return this.getProductItem(name).getByRole('link').first();
    }

    async addToCart(name: ProductNames): Promise<void> {
        await this.getProductAddToCartButton(name).waitFor();
        await this.getProductAddToCartButton(name).click();
        await this.submitToCartButton().waitFor();
        await this.submitToCartButton().click();
    }

    async addToWishList(name: ProductNames): Promise<void> {
        await this.getProductAddToCartButton(name).waitFor();
        await this.getProductAddToCartButton(name).click();
        await this.wishListButton().waitFor();
        await this.wishListButton().click();
    }

}