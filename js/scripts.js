document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([31.0461, 34.8516], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function fetchEarthquakeData() {
        fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
            .then(response => response.json())
            .then(data => {
                displayEarthquakes(data);
            })
            .catch(error => console.error('Error fetching earthquake data:', error));
    }

    function displayEarthquakes(data) {
        data.features.forEach(earthquake => {
            var coords = earthquake.geometry.coordinates;
            var magnitude = earthquake.properties.mag;
            var place = earthquake.properties.place;
            var time = new Date(earthquake.properties.time);

            var marker = L.circleMarker([coords[1], coords[0]], {
                radius: magnitude * 2,
                fillColor: "#f03",
                color: "#f03",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`<b>מיקום:</b> ${place}<br><b>עוצמה:</b> ${magnitude}<br><b>שעה:</b> ${time.toLocaleString()}`);

            var infoDiv = document.createElement('div');
            infoDiv.classList.add('earthquake');
            infoDiv.innerHTML = `<b>מיקום:</b> ${place} <br><b>עוצמה:</b> ${magnitude} <br><b>שעה:</b> ${time.toLocaleString()}`;
            infoDiv.addEventListener('click', function() {
                map.setView([coords[1], coords[0]], 8);
                marker.openPopup();
            });
            document.getElementById('earthquake-info').appendChild(infoDiv);
        });
    }

    fetchEarthquakeData();
});
