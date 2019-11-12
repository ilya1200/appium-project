const { remote } = require('webdriverio');

class TestRunner {
    async runTest(testUrl, testScript, ...params) {
        const opts = {
            logLevel: 'trace',
            port: 4444,
            capabilities: {
                browserName: 'chrome',
                deviceName: 'emulator-5554',
                platformName: "android",
                platformVersion: "10",
                automationName: "UiAutomator2",
                chromedriverExecutable: 'C:/Users/ilya1/AppData/Roaming/npm/node_modules/appium/node_modules/appium-chromedriver/chromedriver/win/chromedriver.exe'
            }
        };
        let browser;
        try {
            browser = await remote(opts);
            await browser.url(testUrl);
            await testScript(browser, params);
        } catch (error) {
            console.error(error)
        } finally {
            await browser.pause(6000);
            await browser.closeApp()
            await browser.deleteSession()
        }
    }
}

module.exports = TestRunner;