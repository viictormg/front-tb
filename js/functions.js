const urls = {
    tuboBoy :  "https://aveonline.co/api/nal/v1.0/turboBoy/"
}
const listarZonas = () => {
    fetch(urls.tuboBoy,{
        method: 'POST',
        body: JSON.stringify({tipo : "listarZonas"})
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById("zonas").innerHTML = "";
        res.ciudades.forEach(element => {
            //console.log(element);
            document.getElementById("zonas").innerHTML += `<option value="${element.zonaId}">${element.nombre}</option>`;
        });
    })
    .catch(err => console.log(err))
}

document.getElementById("origen").onchange = () => validarDirecion()
const validarDirecion = (direccion) => {
    console.log(direccion);
}

// inciales
listarZonas()