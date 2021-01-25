sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
    "sap/m/library",
    "sap/ui/model/Filter",
], function (BaseController, JSONModel, formatter, mobileLibrary,Filter) {
	"use strict";

	// shortcut for sap.m.URLHelper
	var URLHelper = mobileLibrary.URLHelper;

	return BaseController.extend("be.ap.ZSD_03_SHIPM_MON.controller.DeliveryItems", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit : function () {
			// Model used to manipulate control states. The chosen values make sure,
			// DeliveryItems page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
				busy : false,
				delay : 0,
				lineItemListTitle : this.getResourceBundle().getText("DeliveryItemsLineItemTableHeading")
			});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			this.setModel(oViewModel, "DeliveryItemsView");

            this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
            

                         
            
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onSendEmailPress : function () {
			var oViewModel = this.getModel("DeliveryItemsView");

			URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},


		/**
		 * Updates the item count within the line item table's header
		 * @param {object} oEvent an event containing the total number of items in the list
		 * @private
		 */
		onListUpdateFinished : function (oEvent) {
			var sTitle,
				iTotalItems = oEvent.getParameter("total"),
				oViewModel = this.getModel("DeliveryItemsView");

			// only update the counter if the length is final
			if (this.byId("lineItemsList").getBinding("items").isLengthFinal()) {
				if (iTotalItems) {
					sTitle = this.getResourceBundle().getText("DeliveryItemsLineItemTableHeadingCount", [iTotalItems]);
				} else {
					//Display 'Line Items' instead of 'Line items (0)'
					sTitle = this.getResourceBundle().getText("DeliveryItemsLineItemTableHeading");
				}
				oViewModel.setProperty("/lineItemListTitle", sTitle);
			}
		},

		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched : function (oEvent) {
			
            this.getModel("appView").setProperty("/layout", "ThreeColumnsEndExpanded");
            var oKeys = {
                Carrid: oEvent.getParameter("arguments").Carrid,
                Connid: oEvent.getParameter("arguments").Connid,
                Fldate: oEvent.getParameter("arguments").Fldate
            }
			
				
                var sPath = "/" + this.getModel().createKey("ShipmentSet", oKeys);
				this.getModel().read(sPath, {
                success: function (oData) {
                    this.getModel("deliveryItemsView").setProperty("/ShipmentSet", oData);
                }.bind(this)
            });
            this.getModel().read(sPath + "/ToDeliveries", {
                success: function (oData) {
                    this.getModel("deliveryItemsView").setProperty("/DeliveryItemSet", oData.results);
                    
                }.bind(this)

            });
		},

		/**
		 * Set the full screen mode to false and navigate to master page
		 */
		onCloseDeliveryItemsPress: function () {
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
			// No item should be selected on master after DeliveryItems page is closed
			this.getOwnerComponent().oListSelector.clearMasterListSelection();
			this.getRouter().navTo("master");
		},

		/**
		 * Toggle between full and non full screen mode.
		 */
		toggleFullScreen: function () {
			var bFullScreen = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
			if (!bFullScreen) {
				// store current layout and go full screen
				this.getModel("appView").setProperty("/previousLayout", this.getModel("appView").getProperty("/layout"));
				this.getModel("appView").setProperty("/layout", "EndColumnFullScreen");
			} else {
				// reset to previous layout
				this.getModel("appView").setProperty("/layout",  this.getModel("appView").getProperty("/previousLayout"));
			}
		}
	});

});