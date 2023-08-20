(function() {


    const lat = document.querySelector('#lat').value || -12.0724393;
    const lng = document.querySelector('#lng').value || -76.9746595;
    const mapa = L.map('mapa').setView([lat, lng ], 14);
    let marker;

    //Utilizar Provider y Geocoder

    const geocodeService = L.esri.Geocoding.geocodeService(); 
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //El pin

    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    //Detectar el movimiento del Pin

    marker.on('moveend', function(e){
        marker = e.target

        console.log(marker)

        const posicion = marker.getLatLng()
        console.log(posicion)
        mapa.panTo(new L.latLng(posicion.lat, posicion.lng))

        //Obtener informacion de la calle al soltar el Pin

        geocodeService.reverse().latlng(posicion, 14).run(function(error, resultado){
            

            marker.bindPopup(resultado.address.LongLabel)

            //Llenar los campos divs con DOM

            document.querySelector('.calle').textContent = resultado?.address.LongLabel ?? ''
            document.querySelector('#calle').value = resultado?.address?.Address ?? ''
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? ''
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? ''
        })
    })

})()