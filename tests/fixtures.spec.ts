import { chromium } from "@playwright/test";
// import { test } from "../utils/fixtures/screenSizes";
import { test, expect } from "../utils/fixtures/fixtures";
// import test, { expect } from "@playwright/test";

// test('without fixture page', async () => {
//     const myBrowser = await chromium.launch();
//     const myContext = await myBrowser.newContext();
//     const myPage = await myContext.newPage();
//     await myPage.goto('/');
//     await myPage.close();
// })

// test.describe('Fixtures test', () => {
//     test('Open homepage via small screen', async ({ pageSmall, pageBig, pageMedium }) => {
//         await pageSmall.goto('/');
//         await pageSmall.waitForTimeout(2000);
//     })

//     test('Open homepage via medium screen', async ({ pageMedium }) => {
//         await pageMedium.goto('/');
//         await pageMedium.waitForTimeout(2000);
//     })

//     test('Open homepage via big screen', async ({ pageBig }) => {
//         await pageBig.goto('/');
//         await pageBig.waitForTimeout(2000);
//     })
// })


test.use({ storageState: '.auth/testUser1.json' });

test.describe('POM Garage Page tests', () => {

    test.describe('Successful car adding', () => {

        test('Add Audi Q7', async ({ pageSmall, openAddCarFormWithRemoving, garagePage }) => {
            await openAddCarFormWithRemoving.addCar('Audi', 'Q7', '555');
            await expect(garagePage.lastCarName).toHaveText('Audi Q7');
        });

        test('Add BMW 3', async ({ pageMedium, openAddCarFormWithRemoving, garagePage }) => {
            await openAddCarFormWithRemoving.addCar('BMW', '3', '555');
            await expect(garagePage.lastCarName).toHaveText('BMW 3');
        });

        test('Add Ford Focus', async ({ openAddCarFormWithRemoving, garagePage }) => {
            await openAddCarFormWithRemoving.addCar('Ford', 'Focus', '555');
            await expect(garagePage.lastCarName).toHaveText('Ford Focus');
        });

        test('Add Porsche Panamera', async ({ openAddCarFormWithRemoving, garagePage }) => {
            await openAddCarFormWithRemoving.addCar('Porsche', 'Panamera', '555');
            await expect(garagePage.lastCarName).toHaveText('Porsche Panamera');
        });

        test('Add Fiat Panda', async ({ openAddCarFormWithRemoving, garagePage }) => {
            await openAddCarFormWithRemoving.addCar('Fiat', 'Panda', '555');
            await expect(garagePage.lastCarName).toHaveText('Fiat Panda');
        });
    })

})



