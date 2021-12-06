const quote = () => {
  event.preventDefault();

  let tipoPaquete = document.getElementById("paquetes").checked;

  let direcciones = data.address.map(e => {
    return {
      ciudad: e.city,
      direccion: e.address,
    };
  });


  const body = {
    tipo: "cotizacion",
    idEmpresa: 6077,
    usuario: "demo",
    clave: "Webservices",
    retorno: true,
    tipoPaquete: tipoPaquete,
    comentarios: "",
    direcciones
  };

  console.log(body);
};

export { quote };
