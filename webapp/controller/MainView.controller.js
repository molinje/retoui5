sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("retologali.retoui5.controller.MainView", {
        onInit() {

            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/user.json");
            oView.setModel(oJSONModel, "modeluser" );
        }
    });
});