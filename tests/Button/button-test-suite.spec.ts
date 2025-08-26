import { ButtonAction } from "../../actions/Button/button-action"
import { BaseAction } from "../../common/base/base-action"
import { test as base } from '@playwright/test';
import { ButtonViews } from "../../views/Button/button-views";

type userFixture = {
    base: BaseAction,
    buttonAction: ButtonAction
}

export const userFixtureButton = base.extend<userFixture>({
    base: async ({ page }, use) => {
        await use(new BaseAction(page))
    },
    buttonAction: async ({ page }, use) => {
        await use(new ButtonAction(page))
    }
})

userFixtureButton("Verify user is able to navigate to button page", async ({ base }) => {
    await base.navigateToButton();
});

userFixtureButton("Verify user is able to click on GotoHome button", async ({base, buttonAction}) =>{
    await base.navigateToButton();
    await buttonAction.clickGotoHomeButton();
});

userFixtureButton("Verify the size of button", async ({base, buttonAction}) =>{
    await base.navigateToButton();
    await buttonAction.sizeOfButton();
});

userFixtureButton("Verify if the button is enabled", async ({base, buttonAction}) =>{
    await base.navigateToButton();
    await buttonAction.verifyButtonEnabled(ButtonViews.whatismyColorBtn, true);
});

userFixtureButton("Verify if the button in not enabled", async ({base, buttonAction}) =>{
    await base.navigateToButton();
    await buttonAction.verifyButtonEnabled(ButtonViews.whatismyColorBtn, false);
});

userFixtureButton("Verify if the button in disabled", async ({base, buttonAction}) =>{
    await base.navigateToButton();
    await buttonAction.verifyButtonDisabled(ButtonViews.disabledBtn, true);
});

userFixtureButton("Verify if the button in not disabled", async ({base, buttonAction}) =>{
    await base.navigateToButton();
    await buttonAction.verifyButtonDisabled(ButtonViews.disabledBtn, false);
});
