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

    validateAdvSearchOutput(advancedSearchOutput, inputsData) {
        // let expectedStr = `You have searched the following:`;
        // if(inputsData.cakeTypes){
        //     return advancedSearchOutput.search(expectedStr);
        // }
        return true;
    }

    // async testAdvancedSearch() {
    //     const inputsData = {
    //         cakeTypes: ["Chocolate", "Cheese", "Mousse"],
    //         cakeRates: ["0-3", "4", "5"],
    //         dateOfUpload: "26/09/2019",
    //         allTheseWords: "Red Velvet cake",
    //         exactWords: "Mousse"
    //     }

    //     await this.testAppium.startDriver();
    //     await this.homePage.navigateToHomePage();
    //     const isSucess = await this.homePage.advancedSearch(inputsData);
    //     if (isSucess) {
    //         console.log(`testSearch: PASS`);
    //     } else {
    //         console.log(`testSearch: FAIL`);
    //     }
    //     await this.testAppium.close();
    //     // !!!!!!!!!!!!!
    //     try {
    //         await homePage.clickAdvancedSearch();
    //         await homePage.fillTheFormWith(inputsData.cakeTypes, inputsData.cakeRates, inputsData.dateOfUpload, inputsData.allTheseWords, inputsData.exactWords);
    //         await homePage.clickFormBtnSearch();
    //         const advancedSearchOutput = await homePage.getAdvancedSearchResults();
    //         const isValid = this.validateAdvSearchOutput(advancedSearchOutput, inputsData);

    //         if (isValid) {
    //             console.log(`HomeTest > testAdvancedSearch(${inputsData}) -- TEST PASS`);
    //         } else {
    //             console.log(`HomeTest > testAdvancedSearch(${inputsData}) -- TEST FAIL`);
    //         }
    //         console.log(advancedSearchOutput);
    //     } catch (error) {
    //         console.error(new Error(`HomeTest > testAdvancedSearch(${inputsData})  FAIL`));
    //         console.error(error);
    //     }
    // }
}

module.exports = HomeTest;


// const ht = new HomeTest();
// ht.testSearch("about");