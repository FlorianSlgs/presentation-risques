import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-situation',
  imports: [],
  templateUrl: './situation.component.html',
  styleUrl: './situation.component.scss',
  standalone: true,
})
export class SituationComponent implements OnInit, AfterViewInit {
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
          color: '#5499c7',
          weight: 2,
          fillOpacity: 0
        }
      }).addTo(this.map);
    });
  }

  private addMarker(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/images/svg/marker_inondations.svg',
      iconSize: [30, 30],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    const villes: { nom: string; degats: string; couts: string; date: string; coords: [number, number] }[] = [
      { nom: 'Grabels', degats:'570 foyers touchés', couts:'1M€ de dégâts', date:'6 octobre 2014', coords: [43.6397, 3.7993] },
      { nom: 'Béziers', degats:'', couts:'3M€ de dégâts', date:'22 octobre 2019', coords: [43.3444, 3.2474] },
      { nom: 'Lamalou-les-Bains', degats:'4 décès', couts:'12M€ de dégâts', date:'16 août 2014', coords: [43.5976, 3.0823] },
      { nom: "Cazouls-d'Hérault", degats:'1 décès', couts:'', date:'22 octobre 2019', coords: [43.5064, 3.4575] }
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

      if (ville.nom === 'Grabels') {
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