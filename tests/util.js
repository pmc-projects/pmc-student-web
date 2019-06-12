const login = (browser) => {
    browser.url('http://localhost:3000')
        .waitForElementVisible('body');

    browser.expect.element('#action').to.be.visible;
    browser.expect.element('#action').text.to.equal('PRIJAVITE SE');

    browser.setValue('input[name=email]', 'demo@pmc.edu.rs');
    browser.setValue('input[name=password]', "pmcdemo");

    browser.click('#action');

    browser.waitForElementVisible('#title');
};

const openProject = (browser) => {
    browser.click('a[data-name="Testiranje Predmeta"]');

    browser.waitForElementVisible('h1[data-name="Testiranje Predmeta"]');

    browser.waitForElementVisible('#todo-list');

    browser.expect.elements('#project-list > div').to.be.present;
};

module.exports = {
    login,
    openProject
};