exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    multiCapabilities: [{
        'shardTestFiles': true,
        'maxInstances': 7,
        'maxSessions': 7,
        'browserName': 'firefox',
        'marionette': true,
        'acceptInsecureCerts': true
    },
    {
        'browserName': 'chrome',
        'shardTestFiles': true,
        'maxInstances': 7,
        'maxSessions': 7
    }],
    jasmineNodeOpts: {
        'defaultTimeoutInterval': 120000
    },
    onPrepare: function () {
        // Enable ES6 support in the tests
        require('babel-core/register')({
            presets: ['env']
        });

        // Don't wait for AngularJS to show up
        browser.ignoreSynchronization = true;

        // Add JUnit style text output
        const jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports',
            filePrefix: 'test-results-' + new Date().getTime()
        }))
    }
};
