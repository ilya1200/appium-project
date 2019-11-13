const { remote } = require('webdriverio');
const opts = {
    logLevel: 'trace',
    port: 4444,
    capabilities: {
        deviceName: 'emulator-5554',
        platformName: "android",
        platformVersion: "10",
        automationName: "UiAutomator2",
        appPackage: "com.google.android.gm",
        appActivity: "com.google.android.gm.ConversationListActivityGmail",
    }
};

let driver = undefined;

async function mailTest() {
    driver = await remote(opts);

    await clickGotIt();
    await logIn();
    await sendMail();

    await driver.pause(3000);
    await driver.closeApp();
    await driver.deleteSession();
}

function locateBy(locatorType = "resourceId", locatorValue, locatorClass = "") {
    const locators = {
        resourceId: `android=new UiSelector().resourceId("${locatorValue}")`,
        text: `android=new UiSelector().text("${locatorValue}").className("${locatorClass}")`,
        xpath: `${locatorValue}`
    }

    return locators[locatorType];
}

async function clickGotIt() {
    const gotItBtn = await driver.$(locateBy("resourceId", `com.google.android.gm:id/welcome_tour_got_it`));
    await gotItBtn.click();
    await driver.pause(3000);
}

async function logIn() {
    const loginBtn = await driver.$(locateBy("resourceId", "com.google.android.gm:id/action_done"));
    await loginBtn.click();
    await driver.pause(3000);
    const nextBtn = await driver.$(locateBy("resourceId", "com.google.android.gm:id/gm_dismiss_button"));
    await nextBtn.click();
    await driver.pause(3000);
    await nextBtn.click();
    await driver.pause(3000);
}

async function sendMail() {
    const composeMail = await driver.$("~Compose");
    await composeMail.touchAction('tap');
    await driver.pause(3000);
    const gotItbtn = await driver.$(locateBy("resourceId", `android:id/button1`));
    await gotItbtn.touchAction('tap');
    await driver.pause(3000);

    const to = await driver.$(locateBy("resourceId", `com.google.android.gm:id/to`));
    await to.setValue('shira.n@elevation.ac');

    const subject = await driver.$(locateBy("resourceId", `com.google.android.gm:id/subject`));
    await subject.setValue('Auto email');
    await driver.pause(3000);

    const attach = await driver.$(locateBy('resourceId', 'com.google.android.gm:id/add_attachment'))
    await attach.click()
    await driver.pause(5000);
    const fromPC = await driver.$(locateBy('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout[1]/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.TextView'))
    await fromPC.click()
    await driver.pause(5000);
    const photos = await driver.$(locateBy('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.HorizontalScrollView/android.widget.LinearLayout/android.widget.LinearLayout[3]'))
    await driver.pause(5000);
    await photos.click();

    const firstGif = await driver.$(locateBy('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout'));
    await firstGif.touchAction('tap');
    await driver.pause(5000);

    const selectGif = await driver.$(locateBy('xpath',`//android.view.ViewGroup[@content-desc="Photo taken on Nov 13, 2019 10:42:58 AM"]`));
    await selectGif.touchAction('tap');
    await driver.pause(5000);

    const doneBtn = await driver.$(locateBy('xpath',`/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v7.widget.LinearLayoutCompat`));
    await doneBtn.touchAction('tap');
    await driver.pause(5000);

    const sendBtn = await driver.$(locateBy("resourceId", `com.google.android.gm:id/send`));
    await sendBtn.click()
    await driver.pause(30000);
}

mailTest();

