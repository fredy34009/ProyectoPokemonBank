//Funciones para realizar el filtrado de informacion en el historial
const selectElement = document.querySelector(".buscar");
selectElement.addEventListener("change", (event) => {
    if (localStorage.getItem("transacciones") != null) {
        let valores = JSON.parse(localStorage.getItem("transacciones"));
        let buscar = document.getElementById('buscar');
        const element = document.getElementById("data");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        switch (parseInt(buscar.options[buscar.selectedIndex].value)) {
            case 1:
                for (let i = 0; i < valores.length; i++) {
                    if (valores[i].Transaccion == "Deposito") {
                        buscarDatos(i, valores[i].Transaccion, valores[i].cantidad);
                    }

                }
                break;
            case 2:
                for (let i = 0; i < valores.length; i++) {
                    if (valores[i].Transaccion == "Retiro") {
                        buscarDatos(i, valores[i].Transaccion, valores[i].cantidad);
                    }

                }
                break;
            case 3:
                for (let i = 0; i < valores.length; i++) {
                    if (valores[i].Transaccion != "Deposito" && valores[i].Transaccion != "Retiro") {
                        buscarDatos(i, valores[i].Transaccion, valores[i].cantidad);
                    }

                }
                break;
            case 4:
                for (let i = 0; i < valores.length; i++) {
                    buscarDatos(i, valores[i].Transaccion, valores[i].cantidad);
                }
                break;
        }
    } else {
        document.getElementById("mensaje").innerHTML = "No hay Registros Realiza Transacciones";
        document.getElementById("mensaje").classList = " alert alert-danger";
        document.getElementById("texto").style.display = 'none';

    }

});

function buscarDatos(id, transaccion, cantidad) {
    let columna = document.createElement("tr");
    let celda0 = document.createElement("td");
    let hilera0 = document.createTextNode(id + 1);
    let celda = document.createElement("td");
    let hilera = document.createTextNode(transaccion);
    let celda2 = document.createElement("td");
    let hilera2 = document.createTextNode("$ " + cantidad);
    celda0.appendChild(hilera0);
    celda.appendChild(hilera);
    celda2.appendChild(hilera2);
    columna.appendChild(celda0);
    columna.appendChild(celda);
    columna.appendChild(celda2);
    document.getElementById("data").appendChild(columna);
}
