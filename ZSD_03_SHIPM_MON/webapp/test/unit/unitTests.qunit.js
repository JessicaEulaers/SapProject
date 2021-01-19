/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"be/ap/ZSD_03_SHIPM_MON/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});