import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import {DEFAULT_LOCATION, GOOGLE_MPA_STYLE, ZOOM_LEVEL} from '../../../../../app/shared/config/gmap';
import { MapLoader } from 'src/app/shared/config/map.loader';
import { GeometryModel } from 'src/app/shared/models/geometry.model';
import { LocationMarkerModel } from 'src/app/shared/models/location-maker.model';
import { ToastrService } from 'ngx-toastr';

declare const google: any;

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.component.html',
  styleUrls: ['./set-location.component.css']
})
export class SetLocationComponent implements OnInit {

  markerModel: LocationMarkerModel = new LocationMarkerModel();
  markedSubZone: GeometryModel[] = [];

  // map
  @ViewChild('mapRef')
  mapRef!: ElementRef;
  @ViewChild('searchBox')
  input!: ElementRef;
  drawingManager: any;
  map: any;
  polygon: any;
  marker: any;
  geocoder: any;

  constructor(public dialogRef: MatDialogRef<SetLocationComponent>,@Inject(MAT_DIALOG_DATA) public data: string,
              private notify: ToastrService) { }

  ngOnInit(): void {
    MapLoader.load().then(() => {
      this.initMap();
    });
  }

  initMap() {
    const options = {
      center: DEFAULT_LOCATION,
      zoom: ZOOM_LEVEL,
      styles: GOOGLE_MPA_STYLE,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControlOptions: {position: google.maps.ControlPosition.LEFT_BOTTOM},
      fullscreenControl: false,
      gestureHandling: 'greedy',
      mapTypeId: google.maps.MapTypeId.ROADMAP
    } as any;
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.geocoder = new google.maps.Geocoder;
    this.initDrawingManager();
    this.initAutocompleteWidget();
    if (this.data) {
      this.addMarkerByAddress(this.data);
    }
  }

  initDrawingManager() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon', 'marker'] as any
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        strokeColor: '#1FA5FF',
        fillColor: '#1FA5FF',
        strokeOpacity: 1.0,
        strokeWeight: 1.5
      }
    });

    this.drawingManager.setMap(this.map);
    this.drawingManager.setDrawingMode(null);

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
      const _this = this;
      switch (this.drawingManager.getDrawingMode()) {
        case 'marker' : {
          if (this.marker) {
            this.marker.setMap(null);
          }
          this.marker = event.overlay;
          this.marker.setAnimation(google.maps.Animation.DROP);
          const geo: GeometryModel = new GeometryModel();
          geo.longitude = event.overlay.position.lng();
          geo.latitude = event.overlay.position.lat();
          this.markerModel.marker = geo;
          this.drawingManager.setDrawingMode(null);
          this.geocodeLatLng(this.geocoder, event.overlay.position);
          break;
        }
        case 'polygon' : {
          this.polygon = event.overlay;
          this.getCoordinates(event.overlay.getPath().getArray());
          event.overlay.enableCoordinatesChangedEvent();
          google.maps.event.addListener(event.overlay, 'coordinates_changed', function (index: any, obj: any) {
            _this.getCoordinates(event.overlay.getPath().getArray());
            _this.polygon = event.overlay;
          });
          this.drawingManager.setDrawingMode(null);
          break;
        }
      }
    });
  }

  geocodeLatLng(geocoder: any, latLang: any) {
    const _this = this;
    geocoder.geocode({'location': latLang}, function (results: any, status: any) {
      if (status === 'OK') {
        if (results[0]) {
          _this.markerModel.address = results[0].formatted_address;
        }
      }
    });
  }

  getCoordinates(list: any) {
    this.markedSubZone = [];
    list.forEach((item : any) => {
      this.markedSubZone.push(new GeometryModel(item.lat(), item.lng()));
    });
    this.markedSubZone.push(new GeometryModel(list[0].lat(), list[0].lng()));
    this.markerModel.geometryList = this.markedSubZone;
  }

  addMarkerByAddress(address: string) {
    const _this = this;
    this.geocoder.geocode({'address': address}, function (results: any, status: any) {
      if (status === 'OK') {
        _this.map.setCenter(results[0].geometry.location);
        _this.marker = new google.maps.Marker({
          map: _this.map,
          position: results[0].geometry.location
        });
      } else {
        _this.notify.error('Unable to find location');
      }
    });
  }

  clearPolygon() {
    if (this.polygon) {
      this.polygon.setMap(null);
    }

    if (this.marker) {
      this.marker.setMap(null);
    }

  }

  initAutocompleteWidget() {
    const _this = this;
    const map = this.map;
    const autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement);
    autocomplete.bindTo('bounds', map);
    autocomplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);
    const marker = new google.maps.Marker({map: map}) as any;
    autocomplete.addListener('place_changed', function () {
      const place = autocomplete.getPlace() as any;

      if (!place.place_id) {
        return;
      }
      _this.geocoder.geocode({'placeId': place.place_id}, function (results: any, status: any) {
        if (status !== 'OK') {
          return;
        }

        const geo: GeometryModel = new GeometryModel();
        geo.longitude = place.geometry.location.lng();
        geo.latitude = place.geometry.location.lat();
        _this.markerModel.marker = geo;
        _this.markerModel.address = results[0].formatted_address;

        map.setZoom(18);
        map.setCenter(results[0].geometry.location);

        marker.setPlace({placeId: place.place_id, location: results[0].geometry.location});
        marker.setVisible(true);
        _this.marker = marker;
      });
    });
  }

}
