/// <reference types="@types/googlemaps" />
import { MapTypeStyle } from '@agm/core';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
declare let google: any;

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})
export class Componente2Component implements OnInit {
  @ViewChild('mapContainer') gmap: ElementRef;
  @Input() HoraNoche = 18;
  map: google.maps.Map;
  title = 'Mapa de distribucion';
  lat = -34.9210273;
  lng = -57.9538458;
  zoom = 15;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: this.zoom
  };
  markerOrigin : google.maps.Marker;
  markers = [];
  R = 6371.8;
  styles = {
    default: [],
    silver: [
      {
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }],
      },
      {
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#f5f5f5" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#bdbdbd" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#eeeeee" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#e5e5e5" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#dadada" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#e5e5e5" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#eeeeee" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#c9c9c9" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
    ],
    night: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
    retro: [
      { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#c9b2a6" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{ color: "#dcd2be" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ae9e90" }],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#a5b076" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f5f1e6" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#fdfcf8" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#f8c967" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#e9bc62" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#e98d58" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#db8555" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#b9d3c2" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#92998d" }],
      },
    ],
    hiding: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };
  constructor() {}

  ngOnInit() {
      this.setCurrentLocation();
      this.setData();
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  setData(){
    this.markerOrigin = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });

    this.markers.push(new google.maps.Marker({
      position: new google.maps.LatLng(-34.921027, -57.953846),
      map: this.map,
    }));

    this.markers.push(new google.maps.Marker({
      position: new google.maps.LatLng(-34.911027,-57.933846),
      map: this.map,
    }));

    this.markers.push(new google.maps.Marker({
      position: new google.maps.LatLng(-34.9161298,-57.9544852),
      map: this.map,
    }));

    this.mapInitializer();
  }
 
  // setCapaPublica(){
  //   const transitLayer = new google.maps.TransitLayer();
  //   transitLayer.setMap(this.map);
  // }

  // //capa de transito de publico en la zona.
  // setCapaTransito(){
  //   const trafficLayer = new google.maps.TrafficLayer();
  //   trafficLayer.setMap(this.map);
  // }

   mapInitializer(): void {
     const date = new Date();
     //modo noche luego de las 18 hs.
     if(date.getHours() > this.HoraNoche){
       this.mapOptions.styles = this.styles.night as MapTypeStyle[]; 
     }
     // https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    //capa de trafico
    //this.setCapaTransito();

    //capa de transito de publico en la zona.
    //this.setCapaPublica();
    
    //modal que aparece para mostrar info al presionar sobre una posicion del maker
    const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">_titulo_</h1>' +
    '<div id="bodyContent">' +
    "<p><b>_subtitulo_</b></p>" +
    "<p><b>_distancia_</b></p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

    //Adding Click event to default marker
    // this.markerOrigin.addListener("click", () => {
    //   const infoWindow = new google.maps.InfoWindow({
    //     content: contentString.replace('_titulo_', 'titulo a poner').replace('_subtitulo_', 'sub titulo a poner').replace('_distancia_', '')
    //   });
    //   infoWindow.open(this.markerOrigin.getMap(), this.markerOrigin);
    // });

    //Adding default marker to map
    this.markerOrigin.setMap(this.map);

    //setear marcas en el mapa segun lat y long.
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      const distancia = this.haversine_distance(this.markerOrigin.getPosition(), markerInfo.position)
      const distanciaTexto = "Distancia en linea recta: " + distancia.toFixed(2) + " km.";
      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: contentString.replace('_titulo_', marker.getTitle()).replace('_subtitulo_', 'sub titulo a poner').replace('_distancia_', distanciaTexto)
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //crear circulo en una posicion.
      const cityCircle = new google.maps.Circle({
        strokeColor: "#242f3e",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#242f3e",
        fillOpacity: 0.35,
        map: this.map,
        center: markerInfo.position,
        radius: 100,
      });
      
      new google.maps.Polyline({path: [this.markerOrigin.getPosition(), markerInfo.position], map: this.map});
      
      //Adding marker to google map
      marker.setMap(this.map);
    });
  }
  haversine_distance(mk1, mk2) {
    const rlat1 = mk1.lat() * (Math.PI/180); // Convert degrees to radians
    const rlat2 = mk2.lat() * (Math.PI/180); // Convert degrees to radians
    const difflat = rlat2-rlat1; // Radian difference (latitudes)
    const difflon = (mk2.lng()-mk1.lng()) * (Math.PI/180); // Radian difference (longitudes)
    const d = 2 * this.R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }
  
  // cerrar() {
    
  // }
}

