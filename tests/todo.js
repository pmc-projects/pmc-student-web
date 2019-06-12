const util = require("./util");

module.exports = {
    'Student moze da vidi postojece zadatke': (browser) => {
        util.login(browser);
        util.openProject(browser);

        browser.end();
    },

    'Student moze da kreira novi zadatak': (browser) => {
        util.login(browser);
        util.openProject(browser);

        browser.click('#create-todo');

        browser.setValue('#name', 'Test Zadatak');
        browser.setValue('#description', 'Opis test zadatka');

        browser.click('#submit-todo');

        browser.waitForElementVisible('[data-name="Test Zadatak"]');

        browser.pause(1000);

        browser.end();
    },

    'Student moze da markira zadatak kao odradjen': (browser) => {
        util.login(browser);
        util.openProject(browser);

        browser
            .elements('css selector', '[data-role=title][data-name="Primer zadatka"]', function (elements) {
                elements.value.forEach(function (element) {
                    browser.elementIdCssProperty(element.ELEMENT, 'text-decoration', function (attribute) {
                        var checked = attribute.value.split(" ")[0] === "line-through";

                        browser.click('[data-name="Primer zadatka"][data-role=check]');

                        browser.pause(1000);

                        browser.expect.element('[data-role=title][data-name="Primer zadatka"]').to.have.css('text-decoration').which.equals((checked ? 'none' : 'line-through') + ' solid rgba(0, 0, 0, 0.87)');
                    });
                });
            })
            .pause(1000)
            .elements('css selector', '[data-role=title][data-name="Primer zadatka"]', function (elements) {
                elements.value.forEach(function (element) {
                    browser.elementIdCssProperty(element.ELEMENT, 'text-decoration', function (attribute) {
                        var checked = attribute.value.split(" ")[0] === "line-through";

                        browser.click('[data-name="Primer zadatka"][data-role=check]');

                        browser.pause(1000);

                        browser.expect.element('[data-role=title][data-name="Primer zadatka"]').to.have.css('text-decoration').which.equals((checked ? 'none' : 'line-through') + ' solid rgba(0, 0, 0, 0.87)');
                    });
                });
            })
            .pause(1000)
            .end();
    },

    'Student moze da obrise postojeci zadatak': (browser) => {
        util.login(browser);
        util.openProject(browser);

        browser.elements('css selector', '[data-role=delete][data-name="Test Zadatak"]', (elements) => {
            elements.value.forEach((el) => {
                browser.elementIdClick(el.ELEMENT);
            });
        });

        browser.waitForElementNotPresent('[data-name="Test Predmet"][data-role="title"]');

        browser.pause(1000);

        browser.end();
    },
};