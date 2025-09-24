import { expect, Page } from "@playwright/test";
import { BookingAPI } from '../common/apiHelper/BookingAPI.interface'

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

    public async waitForElementToBeEnabled(element: string): Promise<any> {
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

    public async retryClickOperation(element: string, retryCount: number, timeOut?: number): Promise<any> {
        await this.page.waitForLoadState()
        let count = 0;
        while (count < retryCount) {
            timeOut ? await this.page.waitForTimeout(timeOut) : null;            
            await this.page.locator(element).click();
            count++;
        }
    }

    public async isDisabled(element: string) {
        await this.page.waitForLoadState()
        let flag = await this.page.locator(element).isDisabled();
        return flag;
    }

    public async isEnabled(element: string) {
        await this.page.waitForLoadState()
        let flag = await this.page.locator(element).isEnabled();
        return flag;
    }
}

export async function functionFormatAPIReq(template: string, values: any[]): Promise<string>{
    return template.replace(/{(\d+)}/g, (match, p1) => {
        const index = parseInt(p1, 10);
        return index < values.length ? String(values[index]): match
    });
}

export async function getPostAPIRequestBody(fname:string, lname: string, price: number, depositpaid: boolean, additionalneeds: string, checkin: string, checkout: string) {
    const apiReq: BookingAPI = {
        firstname: fname,
        lastname: lname,
        totalprice: price,
        depositpaid: depositpaid,
        additionalneeds: additionalneeds,
        bookingdates: {
            checkin: checkin,
            checkout: checkout
        }
    }
    return apiReq    
}

export interface Dictionary<T> {
    [key: string]: T
}   