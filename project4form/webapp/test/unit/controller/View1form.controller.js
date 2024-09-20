/*global QUnit*/

sap.ui.define([
	"project4form/controller/View1form.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1form Controller");

	QUnit.test("I should test the View1form controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
