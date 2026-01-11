// import {test} from '../support/fixtures/gotoHomePage.js'
import {TopMenu} from "../support/enums/topMenuEnums.js";
import {ProductNames} from "../support/enums/productNamesEnums.js";
import {HomePage} from "../support/pages/home.page.js";
import {ApparelPage} from "../support/pages/apparel.page.js";
import {CartPage} from "../support/pages/cart.page.js";
import {test, expect} from '@playwright/test';
import {WishlistPage} from "../support/pages/wishlist.page.js";
import {BooksPage} from "../support/pages/books.page.js";
import {JewelryPage} from "../support/pages/jewelry.page.js";

let homePage: HomePage;
let apparelPage: ApparelPage;
let cartPage: CartPage;
let wishlistPage: WishlistPage
let booksPage: BooksPage;
let jewelryPage: JewelryPage;

test.describe('Place Order', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        apparelPage = new ApparelPage(page);
        cartPage = new CartPage(page);
        wishlistPage = new WishlistPage(page);
        booksPage = new BooksPage(page);
        jewelryPage = new JewelryPage(page);
        await page.goto(homePage['baseUrl']);
    });

    test('Place order with multiple products', async ({}) => {
        await homePage.navigateToTab(TopMenu.Apparel)
        await apparelPage.addToWishList(ProductNames.BlueAndGreenSneaker)
        await apparelPage.goBack()
        const priceBlueJeans = await apparelPage.getProductPrice(ProductNames.BlueJeans)
        await apparelPage.addToCart(ProductNames.BlueJeans)
        await apparelPage.navigateToTab(TopMenu.Jewelry)
        const priceBlackAndWhiteDiamondHeart = await jewelryPage.getProductPrice(ProductNames.BlackAndWhiteDiamondHeart)
        await jewelryPage.addToCart(ProductNames.BlackAndWhiteDiamondHeart)
        await jewelryPage.navigateToTab(TopMenu.Books)
        const priceBookComputingAndInternet = await booksPage.getProductPrice(ProductNames.BookComputingAndInternet)
        await booksPage.addToCart(ProductNames.BookComputingAndInternet)
        await booksPage.goToShoppingCart()
        const actualBluJeansPrice = await cartPage.getProductPrice(ProductNames.BlueJeans)
        expect.soft(actualBluJeansPrice).toBe(priceBlueJeans)
        const actualBlackAndWhiteDiamondHeart = await cartPage.getProductPrice(ProductNames.BlackAndWhiteDiamondHeart)
        expect.soft(actualBlackAndWhiteDiamondHeart).toBe(priceBlackAndWhiteDiamondHeart)
        const actualBookComputingAndInternet = await cartPage.getProductPrice(ProductNames.BookComputingAndInternet)
        expect.soft(actualBookComputingAndInternet).toBe(priceBookComputingAndInternet)
        const quantityBlueJeans = await cartPage.getProductQuantity(ProductNames.BlueJeans)
        expect.soft(quantityBlueJeans).toBe(1)
        const quantityBlackAndWhiteDiamondHeart = await cartPage.getProductQuantity(ProductNames.BlackAndWhiteDiamondHeart)
        expect.soft(quantityBlackAndWhiteDiamondHeart).toBe(1)
        const quantityBookComputingAndInternet = await cartPage.getProductQuantity(ProductNames.BookComputingAndInternet)
        expect.soft(quantityBookComputingAndInternet).toBe(1)
        const subTotalBlueJeans = await cartPage.getProductSubTotal(ProductNames.BlueJeans)
        expect.soft(subTotalBlueJeans).toBe(priceBlueJeans)
        const subtotalBlackAndWhiteDiamondHeart = await cartPage.getProductSubTotal(ProductNames.BlackAndWhiteDiamondHeart)
        expect.soft(subtotalBlackAndWhiteDiamondHeart).toBe(priceBlackAndWhiteDiamondHeart)
        const subtotalBookComputingAndInternet = await cartPage.getProductSubTotal(ProductNames.BookComputingAndInternet)
        expect.soft(subtotalBookComputingAndInternet).toBe(priceBookComputingAndInternet)
        const cartTotal = await cartPage.getCartTotal()
        expect.soft(cartTotal).toBe(subTotalBlueJeans + subtotalBlackAndWhiteDiamondHeart + subtotalBookComputingAndInternet)
        await cartPage.checkout();
        await cartPage.openWishList();
        const wishlistItems = await wishlistPage.getAllItemLinks()
        expect.soft(wishlistItems).toEqual([ProductNames.BlueAndGreenSneaker])

    })
})