/* global describe, browser, it, expect, element, by */
var SuperCalculator = function(){
    'use strict';
    this.firstNumber = element(by.model('first'));
    this.secondNumber = element(by.model('second'));
    this.goButton = element(by.id('gobutton'));
    this.latestResult = element(by.binding('latest'));
    this.history = element.all(by.repeater('result in memory'));

    this.get = function(){
        browser.get('http://juliemr.github.io/protractor-demo/');
    };

    this.clickButton = function(){
        this.goButton.click();
    };

    this.setFirst = function(a){
        this.firstNumber.sendKeys(a);
    };

    this.setSecond = function(a){
        this.secondNumber.sendKeys(a);
    };

    this.getLatestResult = function(){
        return this.latestResult.getText();
    };

    this.getHistoryCount = function(){
        return this.history.count();
    };

};

/* global describe, browser, it, expect, element, by */
describe('angularjs homepage', function() {
    'use strict';
    var superCalculator  = new SuperCalculator();

    function add(a, b) {
        superCalculator.setFirst(a);
        superCalculator.setSecond(b);
        superCalculator.clickButton();
    }

    beforeEach(function(){
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should add 1 and 2', function(){
        add(1,2);
        expect(superCalculator.getLatestResult()).toEqual('3');
    });

    it('should add 4 and 6', function(){
        add(4,6);
        expect(superCalculator.getLatestResult()).toEqual('10');
    });

    it('should have a history', function() {
        add(1, 2);
        add(3, 4);

        expect(superCalculator.getHistoryCount()).toEqual(2);

        add(5, 6);

        expect(superCalculator.getHistoryCount()).toEqual(3); // This is wrong!
    });

});