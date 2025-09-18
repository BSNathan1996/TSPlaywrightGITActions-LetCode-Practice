import { SelectActions } from "../../actions/Select/select-action"
import { BaseAction } from "../../common/base/base-action"
import { test as base } from '@playwright/test'
import { SelectViews } from "../../views/Select/select-views"
import { TestDataSelect } from "../../testData/Select/testData-select"

type userFixture = {
    base: BaseAction,
    selectAction: SelectActions
}

export const userFixtureSelect = base.extend<userFixture>({
    base: async ({ page }, use) => {
        await use(new BaseAction(page))
    },
    selectAction: async ({ page }, use) => {
        await use(new SelectActions(page))
    },
})

userFixtureSelect("Verify if user is able navigate to select module", async ({base}) => {
    await base.navigateToSelect();
});

userFixtureSelect("Verify if user is able to select the fruit options", async ({base,selectAction}) => {
    await base.navigateToSelect();
    await selectAction.selectApple(SelectViews.usingVisibleSelect);
});

userFixtureSelect("Verify if user is able to multi select the superHero names", async ({base,selectAction}) => {
    await base.navigateToSelect();
    await selectAction.selectSupeandverify(SelectViews.multiSelect, TestDataSelect.superHero);
});

userFixtureSelect("Verify if user is able to select and populate all the programming languages", async ({base,selectAction}) => {
    await base.navigateToSelect();
    await selectAction.selectProgramandPrintAll(SelectViews.programSelect, TestDataSelect.programmingLang);
});

userFixtureSelect("Verify if user is able to select and print the country", async ({base,selectAction}) => {
    await base.navigateToSelect();
    await selectAction.selectCountry(SelectViews.countrySelect, TestDataSelect.country);
});