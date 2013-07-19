Description
-----------
This module adds a Baidu Map field type.

A pin on the map can be dragged and dropped by the user while editing the field
contents to choose a position to highlight, a description can also be provided
which will be displayed as a label next to the pin.
HTML may be entered in the description field (such as <br/> to add a line break
to the label).

A search field below the map allows a location name to be entered, if the
location is valid, the pin will be automatically moved to it.

If the field contains multiple entries, they will all be displayed on the same
map when the field is displayed. The viewport will be adjusted to display all of
the pins optimally.

The label styling and pin logo can be changed using the settings page.


Requirements
------------
Drupal 7.x


Installation
------------
After installing the module, set your Baidu API key on the settings page.