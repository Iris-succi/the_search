/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable no-const-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

export default function LeafletControlGeocoder() {
  const map = useMap();

  useEffect(() => {
    let geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && location.search) {
      // parse /?geocoder=nominatim from URL
      const params = new URLSearchParams(location.search);
      const geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder,
    })
      .on("markgeocode", function (e) {
        const latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);

    const accessToken =
      "esmhqzvzY9ctfUUUStrBztM0FgWkxAkJCPS45Hb0DwDMlrFyRAmQ17TIhqVYCPlu";

    // List of all our defaults styles names
    const styles = [
      "jawg-streets",
      "jawg-sunny",
      "jawg-terrain",
      "jawg-dark",
      "jawg-light",
    ];
    const baselayers = {};
    // Creating one tile layers for each style
    styles.forEach(
      (style) =>
        (baselayers[style] = L.tileLayer(
          `https://tile.jawg.io/${style}/{z}/{x}/{y}.png?access-token=${accessToken}`,
          {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
          }
        ))
    );

    // Set the default layer when you open the map
    baselayers["jawg-streets"].addTo(map);
    // Associating each style name to its tile layer
    L.control.layers(baselayers).addTo(map);
  }, []);

  return null;
}
