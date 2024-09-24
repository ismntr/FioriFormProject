sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox",
    "sap/m/PageAccessibleLandmarkInfo" 
], 
function (Controller, History, UIComponent, ODataModel, MessageBox, PageAccessibleLandmarkInfo) {
    "use strict";

    return Controller.extend("project4form.controller.View1form", {
        onInit: function () {
            this._hasUnsavedChanges = false; // Kaydedilmemiş değişiklikleri takip etmek için flag
        },
        onInputChange: function () {
            // Kullanıcı bir input alanında değişiklik yaptığında
            this._hasUnsavedChanges = true;
        },

        onMaterialFormPress: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("materialForm");
        },

        onServiceFormPress: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("serviceForm");
        },
        onCancel: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            this.onInputChange();

            // Eğer kaydedilmemiş değişiklikler varsa uyarı göster
            if (this._hasUnsavedChanges) {
                MessageBox.confirm(
                    "Kaydedilmemiş değişiklikler var. Yine de geri dönmek istiyor musunuz?", {
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        onClose: function (sAction) {
                            if (sAction === MessageBox.Action.YES) {
                                // Evet seçilirse önceki ekrana dön
                                if (sPreviousHash !== undefined) {
                                    window.history.go(-1);
                                } else {
                                    this.getRouter().navTo("home", {}, true);
                                }
                            }
                        }.bind(this)
                    }
                );
            } else {
                // Eğer kaydedilmemiş veri yoksa doğrudan geri dön
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("home", {}, true);
                }
            }
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
