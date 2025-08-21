import { test as setup } from '@playwright/test'
import { BaseAction } from '../common/base/base-action'

type userFixture = {
    base: BaseAction
};

export const authSetup = setup.extend<userFixture>({
    base: async ({page}, use) => {
        await use(new BaseAction(page))
    }
}); 

authSetup("Authentication using creds", async ({base, page}) =>{
    await base.navigateBase();
    // code for login credentions

    // setup storage state
    await page.context().storageState({ path: 'authStorageState.json' });
});