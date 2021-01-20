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
		currencyValue : function (sValue) {
			if (!sValue) {
				return "";
			}

			return parseFloat(sValue).toFixed(2);
        },
        timeValue: function(oValue){
            var oDate = new Date(oValue.ms);
            //var minutes= oDate.getUTCMinutes().length === 1 ? '0' + oDate.getMinutes() : oDate.getMinutes();
            


            return ("0" + oDate.getUTCHours()).slice(-2) + ":" + ("0" + oDate.getUTCMinutes()).slice(-2) + ":" + ("0" + oDate.getUTCSeconds()).slice(-2);
        }   
	};
});