import { Page } from "@playwright/test";
import { helper } from "../../common/helper";
import { ButtonViews } from "../../views/Button/button-views";

export class ButtonAction {
    readonly page: Page;
    helper: helper;

    constructor(page: Page){
        this.page = page;
        this.helper = new helper(page);
    }

    isSuccess: boolean = false;

    public async clickGotoHomeButton() {
        await this.page.click(ButtonViews.gotoHomeBtn);
    }

    public async sizeOfButton(): Promise<void> {
        let box = await this.page.locator(ButtonViews.whatismyColorBtn);
        const boundingbox = await box.boundingBox();
        console.log(`Size of button: `)
        if(boundingbox){
            const width = boundingbox.width;
            const height = boundingbox.height;
            console.log(`width: ${width}, height: ${height}`);
        }else{
            console.log("boundingbox is null");
        }
    }

    public async verifyButtonEnabled(element: string, expected: boolean): Promise<any> {
        this.isSuccess = await this.helper.isEnabled(element);
        this.isSuccess === expected ? console.log(`Button is enabled`) : console.log(`Button is not enabled`);
    }

    public async verifyButtonDisabled(element: string, expected: boolean) {
        this.isSuccess = await this.helper.isDisabled(element);
        this.isSuccess === expected ? console.log(`Button is not enabled`) : console.log(`Button is enabled`)
    }
}