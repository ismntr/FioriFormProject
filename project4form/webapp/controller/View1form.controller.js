sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox",
    "sap/m/PageAccessibleLandmarkInfo",
    "sap/m/MessageToast"
],
    function (Controller, History, UIComponent, ODataModel, MessageBox, PageAccessibleLandmarkInfo, MessageToast) {
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
                                window.history.go(-1);
                                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                                var sCancelMessage = oBundle.getText("cancelMessage");

                                // İptal mesajını göster
                                MessageToast.show(sCancelMessage, {
                                    duration: 5000, // 3 saniye boyunca göster
                                    width: "30em",  // Mesaj genişliği
                                });
                            }
                        }.bind(this)
                    }
                    );
                } else {
                    // Eğer kaydedilmemiş veri yoksa doğrudan geri dön
                    window.history.go(-1);

                }
                // i18n modelinden metin al

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
                        var oBundle = this.getView().getModel("i18n").getResourceBundle();
                        var sSubmitMessage = oBundle.getText("submitSuccessMessage");
                        MessageToast.show(sSubmitMessage);
                    },
                    error: function () {
                        var oBundle = this.getView().getModel("i18n").getResourceBundle();
                        var errorMessage = oBundle.getText("errorMessage");
                        MessageToast.show(errorMessage);
                    }
                });

            },
            onContractExistsSelect: function (oEvent) {
                var bSelected = oEvent.getParameter("selectedIndex") === 0;
                this.getView().byId("uniqueContractNo").setVisible(bSelected);
                this.getView().byId("contractName").setVisible(bSelected);
                this.getView().byId("contractValue").setVisible(bSelected);
                this.getView().byId("contractDate").setVisible(bSelected);
                this.getView().byId("contractDuration").setVisible(bSelected);
                this.getView().byId("temporaryAcceptanceDate").setVisible(bSelected);
                this.getView().byId("contractEndDate").setVisible(bSelected);
                this.getView().byId("guaranteeType").setVisible(bSelected);
            },
            onContractExistsServiceSelect: function (oEvent) {
                // RadioButtonGroup seçimine göre, sözleşmenin var olup olmadığını kontrol et
                var bSelected = oEvent.getParameter("selectedIndex") === 0;

                // İlgili alanların görünürlüğünü ayarlayın
                this.getView().byId("contractNoService").setVisible(bSelected);
                this.getView().byId("contractNameService").setVisible(bSelected);
                this.getView().byId("contractValueService").setVisible(bSelected);
                this.getView().byId("contractDateService").setVisible(bSelected);
                this.getView().byId("contractDurationService").setVisible(bSelected);
                this.getView().byId("temporaryAcceptanceDateService").setVisible(bSelected);
                this.getView().byId("contractEndDateService").setVisible(bSelected);
                this.getView().byId("guaranteeTypeService").setVisible(bSelected);
            }

        });
    });
