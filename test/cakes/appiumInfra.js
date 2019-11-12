const { remote } = require('webdriverio');
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

class AppiumInfra {
    constructor() {
        this.driver = undefined;
    }

    async startDriver() {
        this.driver = await remote(opts);
    }

    async getURL(URL) {
        try {
            await this.driver.url(URL);
            await this.driver.pause(3000);
        } catch (error) {
            return Promise.reject(new Error(`AppiumInfra: Failed to GET the URL: ${URL}.`));
        }
    }

    async close() {
        try {
            await this.driver.pause(3000);
            await this.driver.closeApp();
            await this.driver.deleteSession();
        } catch (error) {
            return Promise.reject(new Error(`AppiumInfra: Failed to ClOSE the Driver.`));
        }
    }

    // async clickElement(locator = "", locatorType = "id", element = null, fromElement = null) {
    //     if (!element) {
    //         element = await this.findElementBy(locator, locatorType, fromElement);
    //     }

    //     try {
    //         await this.driver.sleep(200);
    //         await element.click();
    //         await this.driver.sleep(200);
    //     } catch (error) {
    //         return Promise.reject(new Error(`SeleniumInfra: Could not CLICK on the element with:(${locator}), locatorType (${locatorType}).`));
    //     }
    // }

    // async write(data = "", locator = "", locatorType = "id", element = null, fromElement = null) {
    //     if (!element) {
    //         element = await this.findElementBy(locator, locatorType, fromElement);
    //     }

    //     try {
    //         await element.sendKeys(data);
    //     } catch (error) {
    //         return Promise.reject(new Error(`SeleniumInfra: Could not WRITE to the element with:(${locator}), locatorType (${locatorType}).`));
    //     }
    // }

    // async getTextFromElement(locator = "", locatorType = "id", element = null, fromElement = null) {
    //     if (!element) {
    //         element = await this.findElementBy(locator, locatorType, fromElement);
    //     }

    //     try {
    //         return await element.getText();;
    //     } catch (error) {
    //         return Promise.reject(new Error(`SeleniumInfra: Could not GET TEXT from the element with:(${locator}), locatorType (${locatorType}).`));
    //     }
    // }

    // async clearElementField(locator = "", locatorType = "id", element = null, fromElement = null) {
    //     if (!element) {
    //         element = await this.findElementBy(locator, locatorType, fromElement);
    //     }

    //     try {
    //         await element.clear();
    //     } catch (error) {
    //         return Promise.reject(new Error(`SeleniumInfra: Could not CLEAR the element with:(${locator}), locatorType (${locatorType}).`));
    //     }
    // }

    // async isElementExists(locator = "", locatorType = "id", fromElement = null) {
    //     try {
    //         await this.findElementBy(locator, locatorType, fromElement);
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // }

    // async findElementBy(locator = "", locatorType = "id", fromElement = null) {
    //     try {
    //         if (!fromElement) {
    //             fromElement = this.driver;
    //         }
    //         return await fromElement.$(By[locatorType](locator));
    //     } catch (error) {
    //         return Promise.reject(new Error(`AppiumInfra: Element NOT FOUND with: locator (${locator}), locatorType (${locatorType}).`));
    //     }
    // }

    // async findElementListBy(locator = "", locatorType = "id", fromElement = null) {
    //     try {
    //         if (!fromElement) {
    //             fromElement = this.driver;
    //         }
    //         return await fromElement.$$(By[locatorType](locator));
    //     } catch (error) {
    //         return Promise.reject(new Error(`AppiumInfra: Element List NOT FOUND with: locator (${locator}), locatorType (${locatorType}).`));
    //     }
    // }


    // async URLvalidation(pageName) {
    //     try {
    //         const isValid = await this.driver.wait(until.urlContains(pageName), 8000);
    //         return isValid;
    //     } catch (error) {
    //         return false;
    //     }
    // }

    // async getCurrentURL() {
    //     try {
    //         return await this.driver.getCurrentUrl();
    //     } catch (error) {
    //         return Promise.reject(new Error(`SeleniumInfra: Failed to GET URL.`));
    //     }
    // }

    // async isUrlMatch(pageName = "") {
    //     try {
    //         const currentURL = await this.getCurrentURL();
    //         return currentURL.search(pageName);
    //     } catch (error) {
    //         return false;
    //     }
    // }
}

module.exports = AppiumInfra;