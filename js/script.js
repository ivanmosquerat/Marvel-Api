var hash = "79a60009391f327a9945405b8f960e97"
var sNameHeroe = document.getElementById("idm-name-heroe")
var sDescHeroe = document.getElementById("idm-desc-heroe")
var eInfoHeroe = document.getElementById("idm-info-heroe")
var eImgHeader = document.getElementById("idm-header-heroes");


var eImgHeaderOff = document.getElementById("idm-header-heroes-offline")
var eMsjOffline = document.getElementById("idm-msj-offline")

function init() {
    if (navigator.onLine) {
        eImgHeaderOff.className = "idm-hidden"
        eMsjOffline.className = "idm-hidden"
    } else {
        eImgHeader.className = "idm-hidden"
        document.getElementById("idm-input-search").className = "idm-hidden"
        document.getElementById("idm-search-button").className = "idm-hidden"
        eImgHeaderOff.className = "idm-show"
        eMsjOffline.className = "idm-show"

    }
}

document.getElementById('idm-input-search').onkeypress = function(e) {
    if (e.keyCode == 13) {
        document.getElementById('idm-search-button').click();
    }
}

function makeRequest() {
    var xhttp = new XMLHttpRequest();
    var sInputValue = document.getElementById("idm-input-search").value;

    //CREACION DE LA URL
    var sUrl = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + sInputValue +
        "&apikey=f38e608956518bad8a2bcabe9bc93fbb&hash=79a60009391f327a9945405b8f960e97&ts=200"


    xhttp.onreadystatechange = function() {
        console.log("status: " + this.status + " state: " + this.readyState)

        if (this.status == 409 && this.readyState == 2) {
            alert("Este es un campo requerido")
        } else if (this.status == 0 & this.readyState == 4) {
            offline()
        }
        //RESPUESTA EXITOSA
        else if (this.readyState == 4 && this.status == 200) {
            var oHeroes = JSON.parse(xhttp.responseText)
            heroes = oHeroes.data.results

            //MENSAJE SIN RESULTADOS
            if (heroes.length == 0) {
                var eMsjError = document.createElement("h2")
                var sMsjError = document.createTextNode("RESULTS NOT FOUND")

                eMsjError.appendChild(sMsjError)
                eInfoHeroe.appendChild(eMsjError)
            }

            hidenImg()

            //CICLO PARA RECIBIR Y PINTAR CADA PERSONAJE
            for (i = 0; i < heroes.length; i++) {
                var sNameHeroe = oHeroes.data.results[i].name
                var sDescHeroe = (oHeroes.data.results[i].description == "") ?
                    oHeroes.data.results[i].description = "DESCRIPTION NOT FOUND" :
                    oHeroes.data.results[i].description
                var sImgHeroe = oHeroes.data.results[i].thumbnail.path + "/portrait_fantastic." +
                    oHeroes.data.results[i].thumbnail.extension
                    //Div info general
                var eDivInfo = document.createElement("div");
                eDivInfo.className = "idm-info-ind"
                    //Div imagen
                var eDivImg = document.createElement("div");
                eDivImg.className = "idm-info-img"
                    //Div reseña
                var eDivRes = document.createElement("div");
                eDivRes.className = "idm-info-res"
                    //Elementos de cada personaje
                var eH2Name = document.createElement("h2")
                var eParDesc = document.createElement("p")
                eParDesc.align = "justify"
                var eImgH = document.createElement("img")
                var sTextName = document.createTextNode(sNameHeroe)
                var sTextDesc = document.createTextNode(sDescHeroe)
                    //Texto de cada elemento
                eImgH.src = sImgHeroe
                eH2Name.appendChild(sTextName)
                eParDesc.appendChild(sTextDesc)
                    //Agregar elementos a los div
                eDivImg.appendChild(eImgH)
                eDivRes.appendChild(eH2Name)
                eDivRes.appendChild(eParDesc)
                eDivInfo.appendChild(eDivImg)
                eDivInfo.appendChild(eDivRes)
                eInfoHeroe.appendChild(eDivInfo)
            } //FIN CICLO
        } //FIN CONDICIONAL

    };
    xhttp.open("GET", sUrl, true);
    xhttp.send();
}

function refresh() {
    eImgHeader.className = "idm-show"
    document.getElementById("idm-input-search").value = ""
    eInfoHeroe.innerHTML = ""
}

function hidenImg() {
    eImgHeader.className = "idm-hidden"
    eImgHeaderOff.className = "idm-hidden"
    eMsjOffline.className = "idm-hidden"
}

function reload() {
    window.reload()
}

function offline() {
    console.log('offline' + eMsjOffline);
    eImgHeader.className = "idm-hidden"
    eImgHeaderOff.className = "idm-show"
    eMsjOffline.className = "idm-show"
    document.getElementById("idm-input-search").value = ""
}