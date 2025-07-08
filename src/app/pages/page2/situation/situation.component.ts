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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
    this.addHeraultBorders();
    this.addMarker();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 8
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
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

    let grabelsMarker: L.Marker | null = null; // <-- déclaration unique ici

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
        grabelsMarker = marker;
      }
    });

    // Ouvre le popup de Grabels après avoir ajouté tous les marqueurs
    if (grabelsMarker) {
      setTimeout(() => {
        grabelsMarker!.openPopup();
      }, 200);
    }
  }
}