(function() {

    const lat = -12.0724393;
    const lng = -76.9746595;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades'
            const respuesta = await fetch(url)
            const propiedades = await respuesta.json()

            console.log(propiedades)
        } catch (error) {
            console.log(error)
        }
    }

    obtenerPropiedades()

})()