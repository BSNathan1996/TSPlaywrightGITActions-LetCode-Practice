import { expect, Page } from "@playwright/test";
import { Dictionary, helper } from "../../common/helper";
import { InputView } from "../../views/Inputs/input-views";

export class InputAction {
    readonly page: Page;
    helper: helper;

    constructor(page: Page) {
        this.page = page;
        this.helper = new helper(this.page);
    }

    public async inputTextVisible(element: string){
        await this.helper.waitForElementToBeVisible(element);
    }

    public async inputTextFillText(element: string, text: string){
        await this.page.waitForLoadState();
        var inputBox = this.page.locator(element);
        await this.inputTextVisible(element);
        await inputBox.fill(text);
        await await this.page.waitForLoadState();
    }

    public async getPlaceHolder(testData: Dictionary<string>, element: string){
        var inputBox = await this.page.locator(element);
        const placeholder = await inputBox.getAttribute("value");
        await expect(placeholder).toMatch(testData.placeholder);
    }

    public async clearTextBox(element: string){
        await this.page.waitForLoadState();
        await this.helper.clearText(element);
    }

    public async checkTextBoxEditable(element: string){
        await this.page.waitForLoadState();
        await this.helper.isEditable(element);
    }

    public async checkTextBoxisEnabled(element: string){
        await this.page.waitForLoadState();
        await this.helper.waitForElementToBeEnabled(element);
    }
}