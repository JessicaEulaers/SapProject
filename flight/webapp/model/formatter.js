sap.ui.define([], function () {
    "use strict";

    return {
		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sValue value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
        currencyValue: function (sValue) {
            if (!sValue) {
                return "";
            }

            return parseFloat(sValue).toFixed(2);
        },
        timeValue: function (oValue) {
            var oDate = new Date(oValue.ms);
            return ("0" + oDate.getUTCHours()).slice(-2) + ":" + ('0' + oDate.getMinutes()).slice(-2) + ":" + ('0' + oDate.getSeconds()).slice(-2)
        },
        timeConvert: function (oValue) {
            return (Math.floor(oValue/60)) + " h " + (oValue%60) + " m";

        },
    };
});