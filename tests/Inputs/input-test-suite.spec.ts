import { InputAction } from "../../actions/Inputs/input-action"
import { test as base } from '@playwright/test';
import { InputView } from "../../views/Inputs/input-views";
import { InputTestData } from "../../testData/Inputs/testData-inputs";
import { BaseAction } from "../../common/base/base-action";

type userFixture = {
    base: BaseAction,
    inputAction: InputAction
}

export const userFixtureInput = base.extend<userFixture>({
    inputAction: async ({page}, use) => {
        await use(new InputAction(page))
    },
    base: async ({page}, use) => {
        await use(new BaseAction(page))
    },
});

userFixtureInput("Verify if full name input box is visible", async ({base, inputAction}) => {
    await base.navigateToInputs();
    await inputAction.inputTextVisible(InputView.fullNameTextBox);
});

userFixtureInput("Verify if user is able to enter data in Full name input box", async({base, inputAction}) => {
    await base.navigateToInputs();
    await inputAction.inputTextFillText(InputView.fullNameTextBox, "Test Name");
});

userFixtureInput("Verify if user is able to see the placeholder text in Append textbox", async ({base, inputAction}) => {
    await base.navigateToInputs();
    await inputAction.getPlaceHolder(InputTestData.appendTextPlaceHolder,InputView.appendTextBox);
});

userFixtureInput("Verify if user is able to clear the text in Append textbox", async ({base, inputAction}) => {
    await base.navigateToInputs();
    await inputAction.clearTextBox(InputView.clearTextBox);
});

userFixtureInput("Verify if user is able to clear text and enter data in insideBox", async ({base, inputAction}) => {
    await base.navigateToInputs();
    await inputAction.clearTextBox(InputView.insideTextBox);
});

userFixtureInput("Verify if user is able to enter data in readonly textbox", async({base, inputAction}) => {
    await base.navigateToInputs();
    await inputAction.checkTextBoxEditable(InputView.noWriteTextBox);
});

userFixtureInput("Verify if user is able to fill data in the disabled textbox", async({base, inputAction}) => {
    await base.navigateToInputs();
    await inputAction.checkTextBoxisEnabled(InputView.noEditTextBox);
});