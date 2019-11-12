class HomePage {
    constructor(appium) {
        this.appium = appium;
        this.url = `https://cakes-automation-course-mobile.herokuapp.com/index.html`;
        this.locators = {
            searchIcon: {
                locator: "#searchIcon",
                type: "id"
            },
            searchBox: {
                locator: "#searchInput",
                type: "id"
            },
            searchBtn: {
                locator: "#searchInputButton",
                type: "id"
            },
            advancedSearchIcon: {
                locator: "#advancedSearchIcon",
                type: "id"
            }
        }
    }


    async navigateToHomePage() {
        await this.appium.getURL(this.url);
    }

    async search(searchWord) {
        try {
            await this.openSearchBox();
            await this.fillSearchBox(searchWord);
            await this.clickSearch();
            await this.appium.driver.pause(3000);
            const currentUrl = await this.appium.driver.getUrl();
            searchWord = searchWord.toLowerCase();
            return currentUrl.includes(searchWord);
        } catch (error) {
            console.error(new Error(error));
            return false;
        }
    }

    async openSearchBox() {
        const searchIcon = await this.appium.driver.$(this.locators.searchIcon.locator);
        await searchIcon.click();
    }

    async fillSearchBox(input) {
        const searchBox = await this.appium.driver.$(this.locators.searchBox.locator);
        await searchBox.setValue(input);
    }

    async clickSearch() {
        const searchBtn = await this.appium.driver.$(this.locators.searchBtn.locator);
        await searchBtn.click();
    }

    async openAdvancedSearch() {
        const advancedSearchIcon = await this.appium.driver.$(this.locators.advancedSearchIcon.locator);
        await advancedSearchIcon.click();
    }

    //

    // capitalize(str) {
    //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    // }

    // async fillTheFormWith(cakeTypes = [], cakeRates = [], dateOfUpload = "", allTheseWords = "", exactWords = "") {
    //     for (let cakeType of cakeTypes) {
    //         const cakeTypesCheckBox = this.locators.cakeTypesCheckBox;
    //         const cakeTypeCap = this.capitalize(cakeType);
    //         await this.appium.clickElement(cakeTypesCheckBox.locator(cakeTypeCap), cakeTypesCheckBox.locatorType);
    //     }

    //     for (let cakeRate of cakeRates) {
    //         const cakeRatesCheckBox = this.locators.cakeRatesCheckBox;
    //         await this.appium.clickElement(cakeRatesCheckBox.locator(cakeRate), cakeRatesCheckBox.locatorType);
    //     }

    //     await this.appium.write(dateOfUpload, this.locators.dateOfUpload.locator, this.locators.dateOfUpload.locatorType);
    //     await this.appium.write(allTheseWords, this.locators.allTheseWords.locator, this.locators.allTheseWords.locatorType);
    //     await this.appium.write(exactWords, this.locators.exactWords.locator, this.locators.exactWords.locatorType);
    // }

    // async getAdvancedSearchResults() {
    //     return this.appium.getTextFromElement(this.locators.advancedSearchResults.locator, this.locators.advancedSearchResults.locatorType)
    // }

    // async clickFormBtnSearch() {
    //     await this.appium.clickElement(this.locators.formBtnSearch.locator, this.locators.formBtnSearch.locatorType);
    // }

    // async clickAdvancedSearch() {
    //     await this.appium.clickElement(this.locators.advSearchBtn.locator, this.locators.advSearchBtn.locatorType);
    // }

    // async clickSearch() {
    //     await this.appium.clickElement(this.locators.searchButton.locator, this.locators.searchButton.locatorType);
    // }



    // async clickVisitUs() {
    //     await this.appium.clickElement(this.locators.visitUs.locator, this.locators.visitUs.locatorType);
    // }
}

module.exports = HomePage;