sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/odata/v2/ODataModel"
], 
function (Controller, History, UIComponent, ODataModel) {
    "use strict";

    return Controller.extend("project4form.controller.View1form", {
        onInit: function () {
        },

        onMaterialFormPress: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("materialForm");
        },

        onServiceFormPress: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("serviceForm");
        },
        onCancel: function (evt) {
            sap.m.MessageToast.show("İptal.");
		},
        onSubmit: function () {
            var oModel = this.getView().getModel(); // OData Model
        
            // Log to check if the model is found
            console.log("Model:", oModel);
        
            if (!oModel) {
                sap.m.MessageToast.show("Model not found.");
                return;
            }
        
            var oData = {
                MaterialNo: this.getView().byId("materialNo") ? this.getView().byId("materialNo").getValue() : "",
                Supplier: this.getView().byId("supplier") ? this.getView().byId("supplier").getValue() : "",
                InvoiceNo: this.getView().byId("invoiceNo") ? this.getView().byId("invoiceNo").getValue() : "",
                ModelNo: this.getView().byId("modelNo") ? this.getView().byId("modelNo").getValue() : "",
                SerialNo: this.getView().byId("serialNo") ? this.getView().byId("serialNo").getValue() : "",
                ArrivalDate: this.getView().byId("arrivalDate") ? this.getView().byId("arrivalDate").getDateValue() : "",
                ContractExists: this.getView().byId("contractExists") ? this.getView().byId("contractExists").getSelectedButton().getText() : "",
                UniqueContractNo: this.getView().byId("uniqueContractNo") ? this.getView().byId("uniqueContractNo").getValue() : "",
                ContractName: this.getView().byId("contractName") ? this.getView().byId("contractName").getValue() : ""
            };
        
            oModel.create("/MaterialFormSet", oData, {
                success: function () {
                    sap.m.MessageToast.show("Form başarıyla gönderildi.");
                },
                error: function () {
                    sap.m.MessageToast.show("Form gönderilirken hata oluştu.");
                }
            });
        }
    });
});
