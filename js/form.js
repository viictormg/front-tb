const quote = () => {
  event.preventDefault();

  let tipoPaquete = document.getElementById("paquetes").checked;

  let direcciones = [];

  data.address.forEach(element => {
    direcciones.push(element.value);
  });


  console.log(direccion.address);

  const body = {
    tipo: "cotizacion",
    idEmpresa: 6077,
    usuario: "demo",
    clave: "Webservices",
    retorno: true,
    tipoPaquete: tipoPaquete,
    comentarios: "",
    direcciones: [
      {
        ciudad: direccion.city,
        direccion: direccion.address,
        referencia: "",
        contacto: "",
        infoAdicional: "There is no more information",
      },
      {
        ciudad: "",
        direccion: "",
        referencia: "",
        contacto: "",
        infoAdicional: "",
      },
    ],
  };


  console.log(body);
};

export { quote };
