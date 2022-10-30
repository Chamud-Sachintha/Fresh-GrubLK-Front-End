import {API_KEY} from '../config/gmap';

declare global {
  module google.maps {
    interface Polygon {
      enableCoordinatesChangedEvent(): any;
    }
  }
}

declare const google: any;
declare let window: any;

export class MapLoader {
  private static promise: Promise<any>;

  public static load(): Promise<any> {
    const browserKey = 'AIzaSyBUfYYndjqv7g4ZGY3cHe4i0sElKC5EllQ';
    const map = {
      URL: 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&libraries=places,geometry,drawing&callback=__onGoogleLoaded',
      // URL: 'https://maps.googleapis.com/maps/api/js?libraries=geometry,places,drawing&key=' + browserKey + '&callback=__onGoogleLoaded',
    };

    // First time 'load' is called?
    if (!this.promise) {

      // Make promise to load
      this.promise = new Promise(resolve => {
        this.loadScript(map.URL);
        // Set callback for when google maps is loaded.
        window['__onGoogleLoaded'] = ($event: any) => {
          google.maps.Polygon.prototype.enableCoordinatesChangedEvent = function () {

            const me = this;
            let isBeingDragged = false;
            const triggerCoordinatesChanged = function () {
              // Broadcast normalized event
              google.maps.event.trigger(me, 'coordinates_changed');
            };

            // If  the overlay is being dragged, set_at gets called repeatedly,
            // so either we can debounce that or igore while dragging,
            // ignoring is more efficient
            google.maps.event.addListener(me, 'dragstart', function () {
              isBeingDragged = true;
            });

            // If the overlay is dragged
            google.maps.event.addListener(me, 'dragend', function () {
              triggerCoordinatesChanged();
              isBeingDragged = false;
            });

            // Or vertices are added to any of the possible paths, or deleted
            const paths = me.getPaths();
            paths.forEach(function (path: any, i: any) {
              google.maps.event.addListener(path, 'insert_at', function () {
                triggerCoordinatesChanged();
              });
              google.maps.event.addListener(path, 'set_at', function () {
                if (!isBeingDragged) {
                  triggerCoordinatesChanged();
                }
              });
              google.maps.event.addListener(path, 'remove_at', function () {
                triggerCoordinatesChanged();
              });
            });
          };
          resolve(('google maps api loaded'));
        };
      });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return this.promise;
  }

  // this function will work cross-browser for loading scripts asynchronously
  static loadScript(src: any, callback?: any): void {
    let s: any,
      r: any,
      t: any;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function () {
      // console.log( this.readyState ); //uncomment this line to see which ready states are called.
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true;
        if (typeof callback === 'function') {
          callback();
        }
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }
}
