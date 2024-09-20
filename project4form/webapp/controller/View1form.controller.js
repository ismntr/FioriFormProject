sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], 
function (Controller, History, UIComponent) {
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
        onSubmit: function () {
            var oModel = this.getView().getModel(); // OData Model
            var oData = {
                MaterialNo: this.getView().byId("materialNo").getValue(),
                Supplier: this.getView().byId("supplier").getValue(),
                // Diğer alanlar
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
