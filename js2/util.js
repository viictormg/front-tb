import { validateAddAddress } from "./validate.js";

const URLS = {
  turboBoy: "https://aveonline.co/api/nal/v1.0/turboBoy/",
  citiesTB: "https://production.turboboy.co/api/v2/cities-by-zone?zone_id=",
};

//CONSUMIENDO AVRONLINE

//CONSUMIENDO TURBOBOY
let data = {
  cities: [],
  address: [{ city: "", address: "" }],
};

document.getElementById("zones").onchange = () => getCities();
document.getElementById("addAdress").onclick = () => addAdress();
document.getElementById("sendForm").onclick = () => sendForm();

const getZones = () => {
  fetch(URLS.turboBoy, {
    method: "POST",
    body: JSON.stringify({ tipo: "listarZonas" }),
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === "ok") {
        document.getElementById("zones").innerHTML = "";
        res.ciudades.forEach(element => {
          document.getElementById(
            "zones"
          ).innerHTML += `<option value="${element.zonaId}">${element.nombre}</option>`;
        });
        getCities();
      }
    });
};

const getCities = () => {
  const zoneId = document.getElementById("zones").value;
  fetch(URLS.citiesTB + zoneId, {
    method: "GET",
  })
    .then(res => res.json())
    .then(res => {
      data.cities = ["seleccione..."].concat(Object.keys(res));
      console.log();
      resetCities();
    });
};

const addAdress = () => {
  let index = document.getElementsByName("cities").length;
  let idElement = index - 1;
  if (validateAddAddress(idElement)) {
    data.address.push({ city: "", address: "" });

    let card = `<div id="cardAddress-${index}" class="card mb-4 py-3 shadow-sm">
              <div class="card-body">
                <button type="button" onclick="dropAddress(${index})" class="card-title btn btn-primary btn-sm float-end">X</button>

                <label for="">Ciudad de entrega ${index}</label>
                <select name="cities" onblur="setAddress(value, ${index}, 'city')" id="cities-${index}" class="form-control"></select>
                <p class="card-text">
                    <label for="">Direccion</label>
                    <input type="text" onblur="setAddress(value, ${index}, 'address')" id="address-${index}" class="form-control">
                </p>
              </div>
        </div>`;

    document.getElementById("directions").innerHTML += card;

    data.cities.forEach((element, i) => {
      document.getElementById(
        `cities-${index}`
      ).innerHTML += `<option>${element}</option>`;
    });

    data.address.forEach((element, i) => {
      if (element.city != null) {
        document.getElementById(`cities-${i}`).value = element.city;
      }
      if (element.address != null) {
        document.getElementById(`address-${i}`).value = element.address;
      }
    });
  }
};

const setAddress = (value, index, key) => {
  data.address[index][key] = value;
};

const resetCities = () => {
  let cities = document.getElementsByName("cities").length;
  for (let i = 0; i < cities; i++) {
    document.getElementById(`cities-${i}`).innerHTML = "";
    data.cities.forEach(element => {
      document.getElementById(
        `cities-${i}`
      ).innerHTML += `<option>${element}</option>`;
    });
  }
};

const dropAddress = index => {
  document.getElementById(`cardAddress-${index}`).remove();
  data.address.splice(index, 1);
  console.log(data.address);
};

const sendForm = () => {
  event.preventDefault();

  let tipoPaquete =  getElementById("paquetes").value;
  console.log(tipoPaquete);
  const body = {
    tipo: "cotizacion",
    idEmpresa: 6077,
    usuario: "demo",
    clave: "Webservices",
    retorno: true,
    tipoPaquete: "1",
    comentarios: "oee",
    direcciones: [
      {
        ciudad: "medellin",
        direccion: "calle 10 20 14",
        referencia: "Universidad Nacional de Colombia",
        contacto: "Miguel Mass",
        infoAdicional: "There is no more information",
      },
      {
        ciudad: "medellin",
        direccion: "carrera 50 10 30",
        referencia: "Universidad Nacional de Colombia",
        contacto: "Miguel Mass",
        infoAdicional: "There is no more information",
      },
    ],
  };

};

// INITIALS
getZones();

// GLOBALS
window.setAddress = setAddress;
window.dropAddress = dropAddress;
window.resetCities = resetCities;
window.validateAddAddress = validateAddAddress;

window.data = data;
