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
            },
            advancedSearchBtn: {
                locator: "#btnForm",
                type: "id"
            },
            cakeTypesCheckBox: {
                locator: cakeType => `input.cakeTypes[value='${cakeType}']`,
                locatorType: "css"
            },
            cakeRatesCheckBox: {
                locator: cakeRate => `input.cakeRates[value='${cakeRate}']`,
                locatorType: "css"
            },
            dateOfUpload: {
                locator: "input.inputDate",
                locatorType: "css"
            },
            allTheseWords: {
                locator: "#input1",
                locatorType: "id"
            },
            exactWords: {
                locator: "#input2",
                locatorType: "id"
            },
            advancedSearchResults: {
                locator: "div.searchedItem",
                locatorType: "css"
            }
        }
    }


    async navigateToHomePage() {
        await this.appium.getURL(this.url);
        await this.appium.driver.pause(1000);
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

    async advancedSearch(cakeTypes = [], cakeRates = [], dateOfUpload = "", allTheseWords = "", exactWords = "") {
        await this.openAdvancedSearch();
        await this.fillTheFormWith(cakeTypes, cakeRates, dateOfUpload, allTheseWords, exactWords);
        await this.clickAdvancedSearch();
        const advancedSearchOutput = await this.getAdvancedSearchResults();
        const isValid = this.validateAdvSearchOutput(advancedSearchOutput, cakeTypes, cakeRates, dateOfUpload, allTheseWords, exactWords);
        return isValid;
    }

    async openAdvancedSearch() {
        const advancedSearchIcon = await this.appium.driver.$(this.locators.advancedSearchIcon.locator);
        await advancedSearchIcon.click();
    }

    async clickAdvancedSearch() {
        const advancedSearchBtn = await this.appium.driver.$(this.locators.advancedSearchBtn.locator);
        await advancedSearchBtn.click();
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async fillTheFormWith(cakeTypes = [], cakeRates = [], dateOfUpload = "", allTheseWords = "", exactWords = "") {
        for (let cakeType of cakeTypes) {
            const cakeTypeCap = this.capitalize(cakeType);
            const cakeTypeCheckBox = await this.appium.driver.$(this.locators.cakeTypesCheckBox.locator(cakeTypeCap));
            await cakeTypeCheckBox.click();
        }

        for (let cakeRate of cakeRates) {
            const cakeRateCheckBox = await this.appium.driver.$(this.locators.cakeRatesCheckBox.locator(cakeRate));
            await cakeRateCheckBox.click();
        }

        // const dateOfUploadInput = await this.appium.driver.$(this.locators.dateOfUpload.locator);
        const allTheseWordsInput = await this.appium.driver.$(this.locators.allTheseWords.locator);
        const exactWordsInput = await this.appium.driver.$(this.locators.exactWords.locator);

        // await dateOfUploadInput.setValue(dateOfUpload);
        await allTheseWordsInput.setValue(allTheseWords);
        await exactWordsInput.setValue(exactWords);
    }

    async getAdvancedSearchResults() {
        const advancedSearchResults = await this.appium.driver.$(this.locators.advancedSearchResults.locator);
        return await advancedSearchResults.getText();
    }

    validateAdvSearchOutput(advancedSearchOutput, cakeTypes = [], cakeRates = [], dateOfUpload = "", allTheseWords = "", exactWords = "") {
        let expectedStr = `You have searched the following:`;

        if (!advancedSearchOutput.includes(expectedStr)) {
            return false;
        }

        for (let cakeType of cakeTypes) {
            const cakeTypeCap = this.capitalize(cakeType);
            if (!advancedSearchOutput.includes(cakeTypeCap)) {
                return false;
            }
        }

        for (let cakeRate of cakeRates) {
            if (!advancedSearchOutput.includes(cakeRate)) {
                return false;
            }
        }

        if (allTheseWords && !advancedSearchOutput.includes(allTheseWords)) {
            return false;
        }

        if (exactWords && !advancedSearchOutput.includes(exactWords)) {
            return false;
        }
        return true;
    }
}

module.exports = HomePage;