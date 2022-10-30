import {GeometryModel} from '../models/geometry.model';

export class LocationMarkerModel {
  geometryList: GeometryModel[] = [];
  focusLocation!: GeometryModel;
  marker!: GeometryModel;
  address!: string;
}
