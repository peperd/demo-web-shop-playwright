import { Page, test } from '@playwright/test';
import {ProductNames} from "../enums/productNamesEnums.js";
import {ProductItem} from "../modules/productItem.js";
import {TopMenu} from "../enums/topMenuEnums.js";
import {TopMenuUrl} from "../enums/topMenuUrls.js";
import {HeaderMenu} from "../modules/headerMenu.js";
import {HeaderLinks} from "../modules/headerLinks.js";

const topMenuUrlMap: Record<TopMenu, TopMenuUrl> = {
    [TopMenu.Books]: TopMenuUrl.Books,
    [TopMenu.Computers]: TopMenuUrl.Computers,
    [TopMenu.Electronics]: TopMenuUrl.Electronics,
    [TopMenu.Apparel]: TopMenuUrl.Apparel,
    [TopMenu.DigitalDownloads]: TopMenuUrl.DigitalDownloads,
    [TopMenu.Jewelry]: TopMenuUrl.Jewelry,
    [TopMenu.Gifts]: TopMenuUrl.Gifts,
};

export class BasePage {
    protected readonly page: Page;
    protected readonly baseSelector: string;
    protected readonly baseUrl: string;
    protected readonly productItem: ProductItem;
    readonly headerMenu: HeaderMenu;
    readonly headerLinks: HeaderLinks;

    constructor(page: Page, baseSelector: string = '.master-wrapper-page', baseUrl: string = 'https://demowebshop.tricentis.com/') {
        this.page = page;
        this.baseSelector = baseSelector;
        this.baseUrl = baseUrl
        this.productItem = new ProductItem(page);
        this.headerMenu = new HeaderMenu(page);
        this.headerLinks = new HeaderLinks(page);
    }

    async addToCart(name: ProductNames): Promise<void> {
        await test.step(`Add ${name} to cart`, async () => {
            await this.productItem.addToCart(name);
        })
    }

    getProductPrice(name: ProductNames): Promise<number> {
        return test.step(`Get ${name} price`, async () => {
            return this.productItem.getProductPrice(name);
        })
    }

    async navigateToTab(tab: TopMenu): Promise<void> {
        const path = topMenuUrlMap[tab];
        const expectedUrl = `${this.baseUrl.replace(/\/$/, '')}${path}`;

        await test.step(`Navigate to ${tab} tab`, async () => {
            await Promise.all([
                this.page.waitForURL(expectedUrl),
                this.page.waitForLoadState('domcontentloaded'),
                this.headerMenu.openTopMenu(tab),
            ]);
        });
    }

    async addToWishList(name: ProductNames): Promise<void> {
        await test.step(`Add ${name} to wishlist`, async () => {
            await this.productItem.addToWishList(name);
        })
    }

    async goBack(): Promise<void> {
        await test.step('Go back', async () => {
            await this.page.goBack();
        })
    }

    async goToShoppingCart(): Promise<void> {
        await test.step('Go to shopping cart', async () => {
            await this.headerLinks.hoverShoppingCart();
            await Promise.all([
                this.page.waitForURL(`${this.baseUrl.replace(/\/$/, '')}${TopMenuUrl.Cart}`),
                this.page.waitForLoadState('domcontentloaded'),
                this.headerLinks.openShoppingCart()
            ]);
        })
    }

    async openWishList():Promise<void>{
        await test.step('Open wishlist', async () => {
            await Promise.all([
                this.page.waitForURL(`${this.baseUrl.replace(/\/$/, '')}${TopMenuUrl.Wishlist}`),
                this.page.waitForLoadState('domcontentloaded'),
                this.headerLinks.openWishList()
            ])
        })
    }
}