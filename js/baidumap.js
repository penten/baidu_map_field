/**
 * @file
 * The javascript code responsible for displaying the baidu map
 */

(function ($) {
  Drupal.behaviors.showBaiduMap = {
    attach: function (context) {
      // In the backend each point will be attached to a map_container, when
      // displaying a map, a single map_container will show all points together.
      // The points belonging to a map_container will be stored in
      // Drupal.settings[id] where id is the id of the map_container.
      $('.map_container').each(function (i, el) {
        var id = $(el).attr('id');
        var map = new BMap.Map(id);
        var editable = $(el).hasClass('edit_map');
        var settings = Drupal.settings.baidu_map;

        // If no points are found (newly added entry), use default settings.
        if (!Drupal.settings[id]) {
          Drupal.settings[id] = [{lon: 0, lat: 0, zoom: 4}];
        }

        // Gather all points defined for this map and place pins if necessary.
        var points = [];
        $.each(Drupal.settings[id], function (i, el) {
          var point = new BMap.Point(el['lon'], el['lat']);
          points.push(point);

          if (!editable) {
            // Place a pin on the map at this point (when viewing map only).
            var pin = new BMap.Marker(point);
            var label = new BMap.Label(el['description']);
            if(Drupal.settings.baidu_map.label_style) {
              label.setStyle(settings.label_style);
            }
            pin.setLabel(label);
            map.addOverlay(pin);

            // Use a custom icon if configured.
            if(Drupal.settings.baidu_map.pin_icon) {
              var icon = new BMap.Icon(
                  Drupal.settings.baidu_map.pin_icon,
                  new BMap.Size(settings.pin_icon_width, settings.pin_icon_height));
              pin.setIcon(icon);
            }
          }
          else {
            // During editing, simply center on the point, pin is added later.
            map.centerAndZoom(point, el['zoom']);
          }
        });

        if (!editable) {
          // Set zoom and center to show all points optimally.
          map.setViewport(points);
        }
        else {
          function updateZoom() {
            // Update zoom input value based upon map's current zoom level.
            $(el).parent().find('input[name*="zoom"]').val(map.getZoom());
          }

          function updatePos(p) {
            // Set lat/lon input value to that of point p.
            $(el).parent().find('input[name*="lat"]').val(p.lat);
            $(el).parent().find('input[name*="lon"]').val(p.lng);
          }

          // Add draggable pin to change lat/lon.
          var pin = new BMap.Marker(map.getCenter());
          pin.enableDragging();
          map.addOverlay(pin);

          pin.addEventListener("dragend", function (e) {
            updatePos(e.point);
          });

          // Add zoom control to change zoom.
          map.addControl(new BMap.NavigationControl());

          map.addEventListener("zoomend", function (e) {
            updateZoom();
          });

          // Add geocoding field to search for a location.
          $(el).parent().find('.map_geocoder_submit').click(function () {
            var geo = new BMap.Geocoder();
            var addr = $(this).parent().find('.map_geocoder').val();
            geo.getPoint(addr, function (p){
              if (p) {
                pin.setPosition(p);
                map.centerAndZoom(p, map.getZoom());

                updatePos(p);
              }
              else {
                alert('Error finding location');
              }
            });
          });
        }

      });
    }
  }
})(jQuery);
