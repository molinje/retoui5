sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("retologali.retoui5.controller.MainView", {
        onInit() {

            const oJSONModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJSONModel.loadData("./model/user.json");
            let data = oJSONModel.getData();
            oView.setModel(oJSONModel, "modeluser");

            // Modelo de países
            const oCountryModel = new sap.ui.model.json.JSONModel();
            oCountryModel.loadData("./model/countries.json");
            oView.setModel(oCountryModel, "countryModel");
            //this. onSetProvince();

        },
        onSave: function (oEvent) {

            var bValid = true;
            // Array de los campos tipo Input para validar
            const fields = [
                { id: "userid", msg: "El ID de usuario es obligatorio." },
                { id: "docnumber", msg: "El número de documento es obligatorio." },
                { id: "firsname", msg: "El nombre es obligatorio." },
                { id: "lastname", msg: "El apellido es obligatorio." },
                { id: "pbirth", msg: "El lugar de nacimiento es obligatorio." },
                //{ id: "region", msg: "La región es obligatoria." },
                { id: "address", msg: "La dirección es obligatoria." },
                { id: "pcode", msg: "El código postal es obligatorio." },
                { id: "phonenumber", msg: "El número de teléfono es obligatorio." },
                { id: "email", msg: "El correo electrónico es obligatorio." }
            ];
            // Array de los campos tipo Select para validar
            const selecs = [
                { id: "typedoc", msg: "El tipo de documento." },
                { id: "genre", msg: "El género es obligatorio." },
                { id: "civilstatus", msg: "El estado civil es obligatorio." },
                { id: "province", msg: "La provincia es obligatoria." },
                { id: "country", msg: "El pais es obligatorio." }
            ];

            var oView = this.getView(); // Instancia de la vista
            var oModel = this.getView().getModel("modeluser"); // Asumiendo que ya está asignado
            var aData = oModel.getProperty("/users");
            let typedoc = "";
            let genre = "";
            let civilstatus = "";
            let country = "";
            let province = "";
            let nationality = "";
            var user = {}; // variable 


            // Función de utilidad para validar campos requeridos
            const validateRequiredField = (oControl, sMessage) => {
                if (!oControl.getValue().trim()) {
                    oControl.setValueState("Error");
                    oControl.setValueStateText(sMessage);
                    bValid = false;
                } else {
                    oControl.setValueState("None");
                }
            };
          
            let userid = this.getView().byId("userid");

            if (this.getView().byId("typedoc").getProperty("selectedKey") !== undefined) {
                 typedoc = this.getView().byId("typedoc").getProperty("selectedKey")
            }

            // leemos valores de los campos
            let docnumber = this.getView().byId("docnumber").getValue();
            let firsname = this.getView().byId("firsname").getValue();
            let lastname = this.getView().byId("lastname").getValue();
            let pbirth = this.getView().byId("pbirth").getValue();  
            //let region = this.getView().byId("region").getValue();
            let address = this.getView().byId("address").getValue();
            let pcode = this.getView().byId("pcode").getValue();
            let phonenumber = this.getView().byId("phonenumber").getValue();
            let email = this.getView().byId("email").getValue().trim();
       

            // leemos valores de los campos de selección
            if (this.getView().byId("generoSelect").getProperty("selectedKey") !== undefined) {
                genre = this.getView().byId("generoSelect").getProperty("selectedKey")
            }


            if (this.getView().byId("civilstatusSelect").getProperty("selectedKey") !== undefined) {
                civilstatus = this.getView().byId("civilstatusSelect").getProperty("selectedKey")
            }

//          Validamos País
            if (this.getView().byId("countrySelect").getProperty("selectedKey") !== undefined) {
                country = this.getView().byId("countrySelect").getProperty("selectedKey")

                if (!oView.byId("countrySelect").getProperty("selectedKey").trim()) {
                    oView.byId("countrySelect").setValueState("Error");
                    oView.byId("countrySelect").setValueStateText("El campo Country es obligatorio");
                    bValid = false;
                } else {
                    oView.byId("countrySelect").setValueState("None");
                }
            }

            
//          validamos nacionalidad
            if (this.getView().byId("nationalitySelect").getProperty("selectedKey") !== undefined) {

                nationality = this.getView().byId("nationalitySelect").getProperty("selectedKey")

                if (!oView.byId("nationalitySelect").getProperty("selectedKey").trim()) {
                    oView.byId("nationalitySelect").setValueState("Error");
                    oView.byId("nationalitySelect").setValueStateText("El campo Country es obligatorio");
                    bValid = false;
                } else {
                    oView.byId("nationalitySelect").setValueState("None");
                }
            }

            
            if (this.getView().byId("provinceSelect").getProperty("selectedKey") !== undefined) {
                province = this.getView().byId("provinceSelect").getProperty("selectedKey")

                if (!oView.byId("provinceSelect").getProperty("selectedKey").trim()) {
                    oView.byId("provinceSelect").setValueState("Error");
                    oView.byId("provinceSelect").setValueStateText("El campo provicia es obligatorio");
                    bValid = false;
                } else {
                    oView.byId("provinceSelect").setValueState("None");
                }
            }

            //let user = oModeluser.oData.form;
            user.userid = userid.getValue().trim();

            if (!user.userid) {
                userid.setValueState("Error");
                userid.setValueStateText("El id de usuario es obligatorio.");
                bValid = false;
            } else {
                userid.setValueState("None");
            }


            // Validar todos los campos tipo Input
            fields.forEach(f => {
                const oControl = oView.byId(f.id);
                validateRequiredField(oControl, f.msg);
            });



            // Validaciones de formato
            if (bValid) {
                // Validación email 
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(email)) {
                    oView.byId("email").setValueState("Error");
                    oView.byId("email").setValueStateText("Formato de email inválido.");
                    bValid = false;
                }
                // Validación codigo postal
                const postalRegex = /^\d{5}$/;
                if (!postalRegex.test(pcode)) {
                    oView.byId("pcode").setValueState("Error");
                    oView.byId("pcode").setValueStateText("Código postal inválido. Debe tener 5 dígitos.");
                    bValid = false;
                }
                // Validación codigo numero de telefono
                const phoneRegex = /^\d{7,15}$/;
                if (!phoneRegex.test(phonenumber)) {
                    oView.byId("phonenumber").setValueState("Error");
                    oView.byId("phonenumber").setValueStateText("Número telefónico inválido. Solo dígitos (7 a 15).");
                    bValid = false;
                }
            }
            // si las validaciones van bien guardamos los datos
            if (bValid == true) {
                user.docnumber = docnumber;
                user.firsname = firsname;
                user.lastname = lastname;
                user.pbirth = pbirth;
                user.nationality = nationality;
                user.genre = genre;
                user.civilstatus = civilstatus;
                user.country = country;
                user.province = province;
                //user.region = region;
                user.address = address;
                user.pcode = pcode;
                user.phonenumber = phonenumber;
                user.email = email;

                //oModeluser.oData.users.push(user);
                aData.push(user);
                oModel.setProperty("/users", aData);

                // Limpiar el formulario
                this.clearForm();
            }





        },
        clearForm: function () {
            // rutina para lipiar los  los datos del formulario 
            const oView = this.getView();
            const aInputIds = [
                "userid", "docnumber", "firsname", "lastname",
                "pbirth", "genre", "civilstatus",
                "province", "address", "pcode",
                "phonenumber", "email"
            ];

            aInputIds.forEach(id => {
                const oInput = oView.byId(id);
                if (oInput) {
                    oInput.setValue("");
                    oInput.setValueState("None");
                }
            });

            // Limpiar el Select
            const oSelect = oView.byId("typedoc");
            if (oSelect) {
                oSelect.setSelectedKey("");
                oSelect.setValueState("None");
            }
        },
        onCountryChange: function (oEvent) {
            // metodo para calcular las ciudades segun el pais seleccionado
            const sSelectedCountryCode = oEvent.getSource().getSelectedKey();
            const oCountryModel = this.getView().getModel("countryModel");
            const aCountries = oCountryModel.getProperty("/countries");
        
            // Encuentra el país seleccionado
            const oSelectedCountry = aCountries.find(country => country.code === sSelectedCountryCode);
        
            // Provincias asociadas
            const aProvinces = oSelectedCountry ? oSelectedCountry.provinces : [];
        
            // Crea modelo temporal solo para provincias
            const oProvinceModel = new sap.ui.model.json.JSONModel({
                provinces: aProvinces
            });
            this.getView().setModel(oProvinceModel, "provinceModel");
        
            // Enlaza el select de provincias
            const oProvinceSelect = this.getView().byId("provinceSelect");
            oProvinceSelect.bindItems({
                path: "provinceModel>/provinces",
                template: new sap.ui.core.Item({ text: "{provinceModel>}", key: "{provinceModel>}" })
            });
        
            // Limpia selección anterior
            oProvinceSelect.setSelectedKey("");
        },
        onSetProvince: function () {
            // metodo para calcular las ciudades segun el pais seleccionado
            const sSelectedCountryCode = "CO";
            const oCountryModel = this.getView().getModel("countryModel");
            const aCountries = oCountryModel.getProperty("/countries");
        
            // Encuentra el país seleccionado
            const oSelectedCountry = aCountries.find(country => country.code === "CO");
        
            // Provincias asociadas
            const aProvinces = oSelectedCountry ? oSelectedCountry.provinces : [];
        
            // Crea modelo temporal solo para provincias
            const oProvinceModel = new sap.ui.model.json.JSONModel({
                provinces: aProvinces
            });
            this.getView().setModel(oProvinceModel, "provinceModel");
        
            // Enlaza el select de provincias
            const oProvinceSelect = this.getView().byId("provinceSelect");
            oProvinceSelect.bindItems({
                path: "provinceModel>/provinces",
                template: new sap.ui.core.Item({ text: "{provinceModel>}", key: "{provinceModel>}" })
            });
        
            // Limpia selección anterior
            oProvinceSelect.setSelectedKey("");
        }
    });
});