/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"ap/be/Shopping/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});