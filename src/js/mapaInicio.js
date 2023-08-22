(function() {

    const lat = -12.0724393;
    const lng = -76.9746595;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 14);

    let markers = new L.FeatureGroup().addTo(mapa);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades'
            const respuesta = await fetch(url)
            const propiedades = await respuesta.json()

            mostrarPropiedades(propiedades);

        } 
        
        catch (error) {
            console.log(error)
        }
    }

    obtenerPropiedades()

    const mostrarPropiedades = propiedades => {

        propiedades.forEach(propiedad => {
            // Agregando los pines

            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <h1 class="text-xl font-extrabold uppercase my-5">${propiedad?.titulo}</h1>
                <img src="/uploads/${propiedad?.imagen}" alt="imagen de la propiedad ${propiedad?.titulo}">
                <p class="font-bold text-center italic text-gray-600">${propiedad.precio.nombre} </p>
                <p class="font-bold text-center italic text-gray-600">${propiedad.categoria.nombre} </p>
                <a href="/propiedad/${propiedad.id}" class=" text-center font-bold block p-2 uppercase">Ver Propiedad</a>
            `)


            markers.addLayer(marker);
        });

    }

})()