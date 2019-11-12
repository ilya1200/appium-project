const TestRunner = require("./testRunner");

async function project1(browser){
    console.log("Project 1");
    const inputHomepage = await browser.$("#search_form_input_homepage");
    await inputHomepage.setValue("webdriverio");

    const search_button_homepage = await browser.$("#search_button_homepage");
    await search_button_homepage.click();

    let title = await browser.getTitle();
    console.log(title);
}

const testRunner = new TestRunner();
testRunner.runTest("https://duckduckgo.com/",project1);