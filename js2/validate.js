const validateAddAddress = index => {
    const city = document.getElementById(`cities-${index}`).value
    const address = document.getElementById(`address-${index}`).value

    if (city != "" && address != "") {
      return true;
    } else {
        alert("La ciudad y la direccion son obligatorias")
      return false;
    }
};

export { validateAddAddress };
