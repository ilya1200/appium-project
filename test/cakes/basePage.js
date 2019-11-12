const AppiumInfra = require("./appiumInfra");

class BasePage {
  constructor() {
    this.appium = new AppiumInfra();
  }
}

module.exports = BasePage;