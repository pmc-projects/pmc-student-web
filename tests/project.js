const util = require("./util");

module.exports = {
    'Student moze da vidi postojece projekte': (browser) => {
        util.login(browser);

        browser.expect.element('#project-list-spinner').is.visible;
        browser.waitForElementNotPresent('#project-list-spinner');

        browser.expect.elements('#project-list > div').to.be.present;

        browser.end();
    },

    'Student moze da kreira novi projekat': (browser) => {
        util.login(browser);

        browser.expect.element('#project-list-spinner').is.visible;
        browser.waitForElementNotPresent('#project-list-spinner');

        browser.click('#create-project');

        browser.setValue('#name', 'Test Predmet');
        browser.setValue('#description', 'Opis test predmeta');

        browser.click('#submit-project');

        browser.waitForElementVisible('a[data-name="Test Predmet"]');

        browser.pause(100);

        browser.end();
    },

    'Student moze da obrise postojeci projekat': (browser) => {
        util.login(browser);

        browser.expect.element('#project-list-spinner').is.visible;
        browser.waitForElementNotPresent('#project-list-spinner');

        browser.elements('css selector', 'svg[data-role=delete][data-name="Test Predmet"]', (elements) => {
            elements.value.forEach((el) => {
                browser.elementIdClick(el.ELEMENT);
            });
        });

        browser.waitForElementNotPresent('a[data-name="Test Predmet"]');

        browser.end();
    },
};