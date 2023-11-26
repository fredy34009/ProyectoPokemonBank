//Funcion para cargar los datos por primera vez en la pagina principal dashboard.html
function cargar() {
    let nombre = "Ash Ketchum";
    let pin = 1234;
    let cuenta = '0987654321';
    let saldo = 500.00;
    document.getElementById("account").innerHTML = " " + localStorage.getItem("nombre");
    if (localStorage.getItem("saldo")) {
        if (document.getElementById("cuenta") != null) {
            document.getElementById("cuenta").innerHTML = "# de Cuenta: " + localStorage.getItem("cuenta");
        }
        if (document.getElementById("nombre") != null) {
            document.getElementById("account").innerHTML = " " + localStorage.getItem("nombre");
            document.getElementById("nombre").innerHTML = "Nombre: " + localStorage.getItem("nombre");
        }
        if (document.getElementById("saldo") != null) {
            document.getElementById("saldo").innerHTML = "Saldo actual: $" + localStorage.getItem("saldo");
        }
        if (document.getElementById("cantidad1") != null) {
            document.getElementById("cantidad1").value = localStorage.getItem("saldo");
        }
        if (document.getElementById("cantidad") != null) {
            document.getElementById("cantidad").value = localStorage.getItem("saldo");
        }
    } else {
        localStorage.setItem("saldo", saldo);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("pin", pin);
        localStorage.setItem("cuenta", cuenta);
        
        if (document.getElementById("cuenta") != null) {
            document.getElementById("cuenta").innerHTML = "# de Cuenta: " + localStorage.getItem("cuenta");
        }
        if (document.getElementById("nombre") != null) {
            document.getElementById("account").innerHTML = " " + localStorage.getItem("nombre");
            document.getElementById("nombre").innerHTML = "Nombre: " + localStorage.getItem("nombre");
        }
        if (document.getElementById("saldo") != null) {
            document.getElementById("saldo").innerHTML = "Saldo actual: $" + localStorage.getItem("saldo");
        }
        if (document.getElementById("cantidad1") != null) {
            document.getElementById("cantidad1").value = localStorage.getItem("saldo");
        }
        if (document.getElementById("cantidad") != null) {
            document.getElementById("cantidad").value = localStorage.getItem("saldo");
        }
    }

}
//funcion para ingresar al logueo
function ingresar() {
    let pin = document.getElementById("pin").value;
    let ping = localStorage.getItem("pin");
    if (pin === ping || pin == 1234) {
        window.location.replace('dashboard.html');
    } else {
        document.querySelector('#mensaje').innerHTML = "Error pin invalido";
        document.querySelector('#mensaje').classList = "alert alert-danger";
    }
}
// funcion para pagar  un tipo de servicio
function servicio(numero) {
    let servicioPagar;
    switch (numero) {
        case 1:
            servicioPagar = "Anda";
            break;
        case 2:
            servicioPagar = "Aes";
            break;
        case 3:
            servicioPagar = "Del sur";
            break;
        case 4:
            servicioPagar = "Claro";
            break;
        case 5:
            servicioPagar = "Digicel";
            break;
        case 6:
            servicioPagar = "Movistar";
            break;
        case 7:
            servicioPagar = "Tigo";
            break;
        case 8:
            servicioPagar = "UDB";
            break;
        case 9:
            servicioPagar = "UFG";
            break;
        case 10:
            servicioPagar = "Grupo Q";
            break;
        case 11:
            servicioPagar = "Yamaha";
            break;
    }
    swal({
        title: "Pagar servicio " + servicioPagar,
        buttons: true,
        content: "input",
        icon: "info",
        text: "Digita el monto a Pagar",
    }).then((value) => {
        if (parseFloat(value)) {
            let saldo = parseFloat(localStorage.getItem('saldo'));
            let monto = parseFloat(value);
            if (monto > saldo || monto < 0) {
                swal({
                    text: "Error monto ingresado es mayor que el saldo disponible o monto es menor de 0",
                    icon: "error",
                    title: "Error"
                });
            } else {
                let datos = [{
                    "Transaccion": "Pago Servicio " + servicioPagar,
                    "cantidad": monto
                        }];
                if (localStorage.getItem("transacciones")) {
                    let data = JSON.parse(localStorage.getItem("transacciones"));
                    console.log("Datos ya existen");
                    let datos = {
                        "Transaccion": "Pago Servicio " + servicioPagar,
                        "cantidad": monto
                    };
                    console.log(data);
                    data.push(datos);
                    localStorage.setItem('saldo', saldo - monto);
                    localStorage.setItem("transacciones", JSON.stringify(data));
                } else {
                    console.log("Creando datos");
                    localStorage.setItem('saldo', saldo - monto);
                    localStorage.setItem("transacciones", JSON.stringify(datos));
                }
                swal({
                    text: "Operacion completada",
                    icon: "success"
                }).then((value) => {
                    console.log(monto);
                    console.log(saldo);
                    generarPDf(2, "Pago Servicio " + servicioPagar, monto, saldo);
                });
            }

        } else if (value == "" || !parseFloat(value)) {
            swal({
                text: "Error solo se permiten numeros y no puede ser vacio",
                icon: "warning"
            });
        }
    });
}
//funcion para confirmar el tipo de transaccion ya sea deposito o retiro
function dialogo(numero) {
    swal({
            title: "Confirmar Transaccion",
            icon: "info",
            buttons: true
        })
        .then((value) => {
            if (value) {
                let saldo = parseFloat(localStorage.getItem('saldo'));
                let abono = parseFloat(document.getElementById('cantidad' + numero).value);
                let abonoMAyor = 0;
                if (abono <= 0 || !abono) {
                    swal({
                        title: 'Error',
                        icon: 'error',
                        text: 'Cantidad Ingresada es invalida',
                    });
                } else {
                    if (numero === 2) {
                        console.log("datos");
                        let nuevo = saldo + abono;
                        localStorage.setItem('saldo', nuevo);
                        let datos = [{
                            "Transaccion": "Deposito",
                            "cantidad": abono
                        }];
                        console.log(datos);
                        if (localStorage.getItem("transacciones")) {
                            let data = JSON.parse(localStorage.getItem("transacciones"));
                            console.log("Datos ya existen");
                            let datos = {
                                "Transaccion": "Deposito",
                                "cantidad": abono
                            };
                            console.log(data);
                            data.push(datos);
                            localStorage.setItem("transacciones", JSON.stringify(data));
                        } else {
                            console.log("Creando datos");
                            localStorage.setItem("transacciones", JSON.stringify(datos));
                        }
                        generarPDf(1, "Deposito", abono, saldo);

                    } else if (numero === 3) {
                        if (saldo < abono) {
                            abonoMAyor = 1;
                        } else {
                            let nuevo = saldo - abono;
                            localStorage.setItem('saldo', nuevo);
                            let datos = [{
                                "Transaccion": "Retiro",
                                "cantidad": abono
                        }];
                            if (localStorage.getItem("transacciones")) {
                                let data = JSON.parse(localStorage.getItem("transacciones"));
                                console.log("Datos de retiro");
                                console.log(data);
                                let datos = {
                                    "Transaccion": "Retiro",
                                    "cantidad": abono
                                };
                                data.push(datos);
                                localStorage.setItem("transacciones", JSON.stringify(data));
                            } else {
                                console.log("Creando datos retiro");
                                localStorage.setItem("transacciones", JSON.stringify(datos));
                            }
                            generarPDf(2, "Retiro", abono, saldo);

                        }
                    }
                    if (abonoMAyor == 1) {
                        swal({
                            text: 'Operacion fallida',
                            icon: 'warning',
                            text: 'Saldo insuficiente',
                        });
                    } else {
                        document.getElementById('cantidad' + numero).value = 0;
                        cargar();
                        swal({
                            text: 'Operacion exitosa',
                            icon: 'success',
                            text: 'Operacion exitosa',
                        });
                    }

                }

            } else {
                swal({
                    title: "Operacion Cancelada",
                    icon: "warning"
                });
            }
        });
}
//Funcion para crear el pdf segun el tipo de servicio prestado
function generarPDf(servicio, tipoServicio, valor, saldo) {

    let nombre = localStorage.getItem("nombre");
    let cuenta = localStorage.getItem("cuenta");
    let nuevosaldo = 0;
    switch (servicio) {
        case 1:
            nuevosaldo = saldo + valor;
            break;
        case 2:
            nuevosaldo = saldo - valor;
            break;
    }
    const {
        jsPDF
    } = window.jspdf;

    const doc = new jsPDF();
    doc.text("\t\t\tCOMPROBANTE POKEMONBANK\n\nCuenta n°: " + cuenta + "\nNombre: " + nombre + "\nSaldo Actual: $ " + saldo + "\nServicio: " + tipoServicio + "\nMonto: $" + valor +
        "\nNuevo Saldo: $ " + nuevosaldo, 25, 25);
    doc.save(tipoServicio + ".pdf");
}
// funcion para crear el grafico 
function grafico() {
    let datas = JSON.parse(localStorage.getItem("transacciones"));
    let retiro = 0;
    let deposito = 0;
    let servicio = 0;
    console.log("Grafico " + servicio);
    for (var i = 0; i < datas.length; i++) {
        if (datas[i].Transaccion == "Deposito") {
            deposito = deposito + 1;
        }
        if (datas[i].Transaccion == "Retiro") {
            retiro = retiro + 1;
        }
        if (datas[i].Transaccion != "Deposito" && datas[i].Transaccion != "Retiro") {
            servicio = servicio + 1;
        }
    }
    let ctx = document.getElementById('myChart');
    const data = {
        labels: [
                    'Deposito',
                    'Retiro',
                    'Pago Servicio'
                ],
        datasets: [{
            label: 'Operaciones',
            data: [deposito, retiro, servicio],
            backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(25, 205, 80)'
                    ],
            hoverOffset: 4
                }]
    };
    new Chart(ctx, {
        type: 'pie',
        data: data,
    });
}

//Funcion para el mostrar el historial por primera vez 
function pintar() {
    if (localStorage.getItem("transacciones") != null) {
        let valores = JSON.parse(localStorage.getItem("transacciones"));

        for (let i = 0; i < valores.length; i++) {
            let columna = document.createElement("tr");
            let celda0 = document.createElement("td");
            let hilera0 = document.createTextNode(i + 1);
            let celda = document.createElement("td");
            let hilera = document.createTextNode(valores[i].Transaccion);
            let celda2 = document.createElement("td");
            let hilera2 = document.createTextNode("$ " + valores[i].cantidad);
            celda0.appendChild(hilera0);
            celda.appendChild(hilera);
            celda2.appendChild(hilera2);
            columna.appendChild(celda0);
            columna.appendChild(celda);
            columna.appendChild(celda2);
            document.getElementById("data").appendChild(columna);
        }
    } else {
        document.getElementById("mensaje").innerHTML = "No hay Registros Realiza Transacciones";
        document.getElementById("mensaje").classList = " alert alert-danger";
        document.getElementById("texto").style.display = 'none';
    }
}
document.onload = cargar();
