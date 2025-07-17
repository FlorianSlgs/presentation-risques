import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-situation-mouvement',
  imports: [],
  templateUrl: './situation.component.html',
  styleUrl: './situation.component.scss',
  standalone: true,
})
export class SituationMouvementComponent implements OnInit, AfterViewInit {
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
          color: '#fb923c',
          weight: 2,
          fillOpacity: 0
        }
      }).addTo(this.map);
    });
  }

  private addMarker(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/images/svg/mvt-terrain_map.svg',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });

    const villes: { nom: string; degats: string; couts: string; date: string; coords: [number, number] }[] = [
      { nom: 'Cazilhac', degats:'1 décès', couts:'', date:'août 2018', coords: [43.918, 3.696] },
      { nom: 'Laroque', degats:'chutes de blocs sur un sentier de randonnée', couts:'', date:'novembre 2008', coords: [43.923, 3.728] },
      { nom: "Saint-Vincent-d'Olargues", degats:"rocher de quinze tonnes s'écrase sur une habitation inoccupée", couts:'', date:'avril 2007', coords: [43.562, 2.879] },
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

      if (ville.nom === 'Cazilhac') {
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