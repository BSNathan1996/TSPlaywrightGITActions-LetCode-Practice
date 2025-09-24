import { Page } from "@playwright/test";
import { helper } from "../helper";

export class BaseAction {
    readonly page: Page;
    helper: helper;
    
    constructor(page: Page) {
        this.page = page;
        this.helper = new helper(this.page);
    }

    public async authLoginBase(){
        await this.page.goto("https://freelance-learn-automation.vercel.app/login");
    }

    public async navigateBase() {
        await this.page.goto("https://letcode.in/test");
    }

    public async navigateToInputs() {
        await this.navigateBase();
        await this.page.waitForLoadState();
        // await this.page.locator("a[href='/edit']").click();
        await this.page.getByRole('link', {name: ' Edit '}).click();
    }

    public async navigateToButton() {
        await this.navigateBase();
        await this.page.waitForLoadState();
        // await this.page.locator("a[href='/button']").click();
        await this.page.getByRole('link', {name: ' Click '}).click();
    }

    public async navigateToSelect() {
        await this.navigateBase();
        await this.page.waitForLoadState();
        // await this.page.locator("a[href='/button']").click();
        await this.page.getByRole('link', {name: ' Drop-Down '}).click();
    }

}
