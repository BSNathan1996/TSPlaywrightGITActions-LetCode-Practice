import { expect, Page } from "@playwright/test";
import { Console } from "console";

export class helper {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    isSuccess: boolean = false;

    public async waitForElementToBeVisible(element: string): Promise<any> {
        await this.page.waitForLoadState()
        this.isSuccess = await this.page.locator(element).isVisible();
        this.isSuccess === true ? console.log("Element is visible") : console.log("Element is not visible");
    }

    public async waitForElementToBeEnabled(element: any): Promise<any> {
        await this.page.waitForLoadState()
        this.isSuccess = await this.page.locator(element).isEnabled();
        this.isSuccess === true ? console.log("Element is visible") : console.log("Element is not visible");
    }

    public async clearText(element: string): Promise<any> {
        await this.page.waitForLoadState()
        await this.page.locator(element).clear();
        await expect(this.page.locator(element)).toHaveText("");
    }

    public async isEditable(element: string) {
        await this.page.waitForLoadState()
        await this.page.locator(element).isEditable();
    }
}

export interface Dictionary<T> {
    [key: string]: T
}   