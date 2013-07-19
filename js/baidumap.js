/**
 * @file
 * The javascript code responsible for displaying the baidu map
 */

(function ($) {
  Drupal.behaviors.showBaiduMap = {
    attach: function(context) {
      $('.map_container').each(function(i, el) {
        var id = $(el).attr('id');
        var map = new BMap.Map(id);
        var editable = $(el).hasClass('edit_map');
        var settings = Drupal.settings.baidu_map;

        var points = [];
        $.each(Drupal.settings[id], function(i, el) {
          var point = new BMap.Point(el['lon'], el['lat']);
          points.push(point);

          if(!editable) {
            var pin = new BMap.Marker(point);
            var label = new BMap.Label(el['description']);
            if(Drupal.settings.baidu_map.label_style) {
              label.setStyle(settings.label_style);
            }
            pin.setLabel(label);
            map.addOverlay(pin);

            if(Drupal.settings.baidu_map.pin_icon) {
              var icon = new BMap.Icon(
                  Drupal.settings.baidu_map.pin_icon,
                  new BMap.Size(settings.pin_icon_width, settings.pin_icon_height));
              pin.setIcon(icon);
            }
          } else {
            map.centerAndZoom(point, el['zoom']);
          }
        });

        if(!editable) {
          // set zoom and center to show all points optimally
          map.setViewport(points);
        } else {
          function updateZoom() {
            $(el).parent().find('input[name*="zoom"]').val(map.getZoom());
          }

          function updatePos(p) {
            $(el).parent().find('input[name*="lat"]').val(p.lat);
            $(el).parent().find('input[name*="lon"]').val(p.lng);
          }

          // Add draggable pin to change position
          var pin = new BMap.Marker(map.getCenter());
          pin.enableDragging();
          map.addOverlay(pin);

          pin.addEventListener("dragend", function(e) {
            updatePos(e.point);
          });

          // Add zoom control to change zoom
          map.addControl(new BMap.NavigationControl());

          map.addEventListener("zoomend", function(e) {
            updateZoom();
          });

          // Add geocoding field to search for a location
          $(el).parent().find('.map_geocoder input[type="button"]').click(function() {
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint($(this).parent().find('input[type="text"]').val(), function(p){
              if (p) {
                pin.setPosition(p);
                map.centerAndZoom(p, map.getZoom());

                updatePos(p);
              } else {
                alert('Error finding location');
              }
            });
          });
        }
      });
    }
  }
})(jQuery);
