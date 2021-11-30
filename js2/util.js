const URLS = {
  turboBoy: "https://aveonline.co/api/nal/v1.0/turboBoy/",
  citiesTB: "https://production.turboboy.co/api/v2/cities-by-zone?zone_id=",
};

let data = {
  cities: [],
  address: [{ city: "", address: "" }],
};

document.getElementById("zones").onchange = () => getCities();
document.getElementById("addAdress").onclick = () => addAdress();

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
      data.cities = Object.keys(res);
      resetCities();
    });
};

const addAdress = () => {
  let index = document.getElementsByName("cities").length;
  data.address.push({ city: '', address: '' });
  let card = `<div class="card mb-4 py-3 shadow-sm">
                                <div class="card-body">
                                <button class="card-title btn btn-primary btn-sm float-end">X</button>
                                <label for="">Ciudad de entrega ${index}</label>
                                <select name="cities" onchange="getAddress(value, ${index}, 'city')" id="cities-${index}" class="form-control"></select>
                                <p class="card-text">
                                    <label for="">Direccion</label>
                                    <input type="text" onchange="getAddress(value, ${index}), 'address' " class="form-control" id="direccion-${index}">
                                </p>
                            </div>
                        </div>
                `;
  document.getElementById("directions").innerHTML += card;

  data.cities.forEach((element, i) => {
    document.getElementById(
      `cities-${index}`
    ).innerHTML += `<option>${element}</option>`;
  });
};

const getAddress = (value, index, key) => {
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

// INITIALS
getZones();

// GLOBALS
window.getAddress = getAddress;
window.data = data;
