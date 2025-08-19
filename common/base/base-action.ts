import { Page } from "@playwright/test";
import { helper } from "../helper";

export class BaseAction {
    readonly page: Page;
    helper: helper;

    constructor(page: Page) {
        this.page = page;
        this.helper = new helper(this.page);
    }

    public async navigateBase() {
        await this.page.goto("https://letcode.in/test");
    }

    public async navigateToInputs() {
        await this.navigateBase();
        await this.page.locator("a[href='/edit']").click();
    }

}
