const BasePage = require("./basePage");
const HomePage = require("./homePage");

class HomeTest {
    constructor() {
        this.testAppium = new BasePage().appium;
        this.homePage = new HomePage(this.testAppium);
    }

    async testSearch(searchWord) {
        await this.testAppium.startDriver();
        await this.homePage.navigateToHomePage();
        const isSucess = await this.homePage.search(searchWord);
        if (isSucess) {
            console.log(`testSearch: PASS`);
        } else {
            console.log(`testSearch: FAIL`);
        }
        await this.testAppium.close();
    }

    async testAdvancedSearch() {
        const inputsData = {
            cakeTypes: ["Chocolate", "Cheese", "Mousse"],
            cakeRates: ["0-3", "4", "5"],
            dateOfUpload: "26/09/2019",
            allTheseWords: "Red Velvet cake",
            exactWords: "Mousse"
        }

        await this.testAppium.startDriver();
        await this.homePage.navigateToHomePage();
        const isSucess = await this.homePage.advancedSearch(inputsData.cakeTypes, inputsData.cakeRates, inputsData.dateOfUpload, inputsData.allTheseWords, inputsData.exactWords);
        if (isSucess) {
            console.log(`testAdvancedSearch: PASS`);
        } else {
            console.log(`testAdvancedSearch: FAIL`);
        }
        await this.testAppium.close();
    }
}

module.exports = HomeTest;
