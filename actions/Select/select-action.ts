import { expect, Page } from "@playwright/test";
import { Dictionary, helper } from "../../common/helper";
import { SelectViews } from "../../views/Select/select-views";

export class SelectActions {
    readonly page: Page
    helper: helper

    constructor(page: Page) {
        this.page = page
        this.helper = new helper(page);
    }   

    public async selectApple(element: string) {
        await this.page.waitForLoadState();
        await this.page.locator(element).selectOption("Apple");
    }

    public async selectSupeandverify(element: string, testData: Dictionary<string>) {
        await this.page.waitForLoadState();
        let scrollbox = await this.page.locator(element).filter({
            hasText:testData.stephen
        });
        await scrollbox.scrollIntoViewIfNeeded();
        await scrollbox.click();
        let successText = await this.page.locator(SelectViews.notifySuccess);
        await expect(successText).toHaveText(`You have selected ${testData.Bat}`);
    }

    public async selectProgramandPrintAll(element: string, testData: Dictionary<string>) {
        await this.page.waitForLoadState();
        let progDrop =  await this.page.locator(element);
        let progText = await progDrop.locator(`option`).all();
        for( let prog of progText){
            let programmingText = await prog.textContent();
            console.log(programmingText);
        }
        for (let prog of progText){
            if (testData.py === await prog.textContent()){
                await prog.click();
                break;
            }
        }
    }

    public async selectCountry(element: string, testData: Dictionary<string>) {
        await this.page.waitForLoadState();
        await this.page.locator(element).selectOption(testData.IND);
        console.log(`Country Selected: ${testData.IND}`);
    }   
}