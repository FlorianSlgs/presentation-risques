import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-situation-feux',
  imports: [],
  templateUrl: './situation.component.html',
  styleUrl: './situation.component.scss',
  standalone: true,
})
export class SituationFeuxComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [43.5797, 3.3672];
  private isMobile: boolean = false;
  private mapElementId: string = 'map-feux';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Détection simple du mobile
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                    || window.innerWidth <= 768;
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.addHeraultBorders();
    this.addMarker();
  }

  private initMap(): void {
    this.map = L.map(this.mapElementId, {
      center: this.centroid,
      zoom: 8,
      // Désactive le drag uniquement sur mobile
      dragging: !this.isMobile,
      // Permet le zoom tactile (pincement)
      touchZoom: true,
      // Désactive le zoom à la molette pour éviter les conflits avec le scroll
      scrollWheelZoom: false,
      // Permet le double-clic pour zoomer
      doubleClickZoom: true,
      // Désactive le zoom par rectangle
      boxZoom: false,
      tapTolerance: 15,
      // Désactive le déplacement au clavier sur mobile
      keyboard: !this.isMobile
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Désactive également le panning inertiel sur mobile
    if (this.isMobile && this.map.options.inertia) {
      this.map.options.inertia = false;
    }
  }

  private addHeraultBorders(): void {
    this.http.get('assets/cartes/json/departement-34-herault.geojson').subscribe((geojson: any) => {
      L.geoJSON(geojson, {
        style: {
          color: '#22c55e',
          weight: 2,
          fillOpacity: 0
        }
      }).addTo(this.map);
    });
  }

  private addMarker(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/images/svg/feux_map.svg',
      iconSize: [30, 30],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    const villes: { nom: string; degats: string; couts: string; date: string; coords: [number, number] }[] = [
      { nom: 'St-Bauzille de la Sylve', degats:'952 ha brûlés', couts:'', date:'22 juillet 2022', coords: [43.618, 3.546] },
      { nom: 'Fabrègues', degats:'400 ha brûlés', couts:'', date:'5 juillet 2025', coords: [43.551, 3.777] },
      { nom: 'Minerve', degats:'80 ha brûlés', couts:'', date:'15 septembre 2024', coords: [43.355, 2.744] },
      { nom: "Villeveyrac", degats:'200 ha brûlés', couts:'', date:'5 septembre 2023', coords: [43.501, 3.607] }
    ];

    let stBauzilleMarker: L.Marker | null = null;

    villes.forEach(ville => {
      const popupContent = `
        <b>${ville.nom}</b><br>
        ${ville.date ? `${ville.date}<br>` : ''}
        ${ville.degats ? `${ville.degats}<br>` : ''}
        ${ville.couts ? `${ville.couts}` : ''}
      `;
      const marker: L.Marker = L.marker(ville.coords, { icon: customIcon })
        .addTo(this.map)
        .bindPopup(popupContent);

      if (ville.nom === 'St-Bauzille de la Sylve') {
        stBauzilleMarker = marker;
      }
    });

    // Ouvre le popup de St-Bauzille de la Sylve après avoir ajouté tous les marqueurs
    if (stBauzilleMarker) {
      setTimeout(() => {
        stBauzilleMarker!.openPopup();
      }, 200);
    }
  }

  ngOnDestroy(): void {
    // Détruit la carte Leaflet proprement
    if (this.map) {
      this.map.remove();
    }
  }
}