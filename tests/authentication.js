module.exports = {
    'Student moze da se registruje': (browser) => {
        const email = `${Math.floor(Math.random() * 10000000)}@example.com`;

        browser.url('http://localhost:3000')
            .waitForElementVisible('body');

        browser.expect.element('#action').to.be.visible;
        browser.expect.element('#action').text.to.equal('PRIJAVITE SE');

        browser.click('#alt-action');

        browser.expect.element('#action').text.to.equal('REGISTRUJTE SE');

        browser.setValue('input[name=email]', email);
        browser.setValue('input[name=password]', "SuperSecret");

        browser.click('#action');

        browser.waitForElementVisible('#title');

        browser.assert.containsText('body', 'Izlogujte se');

        browser.end();
    },

    'Student moze da se uloguje': (browser) => {
        browser.url('http://localhost:3000')
            .waitForElementVisible('body');

        browser.expect.element('#action').to.be.visible;
        browser.expect.element('#action').text.to.equal('PRIJAVITE SE');

        browser.setValue('input[name=email]', 'demo@pmc.edu.rs');
        browser.setValue('input[name=password]', "pmcdemo");

        browser.click('#action');

        browser.waitForElementVisible('#title');

        browser.end();
    }
};