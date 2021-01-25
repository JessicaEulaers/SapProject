sap.ui.define([
        "sap/ui/core/mvc/Controller",
        'sap/m/MessageToast'
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, MessageToast) {
		"use strict";

		return Controller.extend("ns.HelloWorld.controller.Master", {
			onInit: function () {
                //new model of json
                //new sap.ui.model.json.JSONModel({"name": ""});
                this.getView().setModel(new sap.ui.model.json.JSONModel({"name": "Jessica"}), "json");
            },
            onPress: function(){
                    var model= this.getView().getModel( "json");
                    //.getProperty();
                    //var msg = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\r\n eirmod.';
                    MessageToast.show(model.getProperty("/name"));
            }
		});
	});
