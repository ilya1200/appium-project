const remote = require("webdriverio").remote;

function locateBy(locatorType = "resourceId", locatorValue, locatorClass = "") {
    const locators = {
        resourceId: `android=new UiSelector().resourceId("${locatorValue}")`,
        text: `android=new UiSelector().text("${locatorValue}").className("${locatorClass}")`,
        xpath: `${locatorValue}`
    }

    return locators[locatorType];
}

async function calcTest() {
    const opts = {
        port: 4444,
        capabilities: {
            uuid: "emulator-5554",
            platformName: "Android",
            platformVersion: "10",
            deviceName: "Android Emulator",
            appPackage: "com.google.android.calculator",
            appActivity: "com.android.calculator2.Calculator",
            automationName: "UiAutomator2"
        }
    };


    const driver = await remote(opts);
    try {
        let btn;
        let result;

        btn = await driver.$(locateBy("resourceId", `com.google.android.calculator:id/digit_2`));
        await btn.click();

        btn = await driver.$(locateBy("resourceId", "com.google.android.calculator:id/op_add"));
        await btn.click();

        btn = await driver.$(locateBy("resourceId", `com.google.android.calculator:id/digit_3`));
        await btn.click();


        btn = await driver.$(locateBy("resourceId", "com.google.android.calculator:id/op_mul"));
        await btn.click();

        btn = await driver.$(locateBy("resourceId", `com.google.android.calculator:id/digit_5`));
        await btn.click();

        btn = await driver.$(locateBy("resourceId", "com.google.android.calculator:id/eq"));
        await btn.click();


        result = await driver.$(locateBy("resourceId", "com.google.android.calculator:id/result_final"));
        result = await result.getText();

        console.log(`CALC RESULT = ${result}`);
    } catch (error) {
        console.error(error);
    }

    await driver.deleteSession();
}

calcTest();
