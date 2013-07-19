<?php

/**
 * @file
 * Provides the settings form of the module
 */

/**
 * Defines the settings form for of the module.
 */
function baidu_map_field_settings_form($form, &$form_state) {
  $form['baidu_map_field_api_key'] = array(
    '#title' => t('Baidu Map API Key'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_api_key', ''),
    '#required' => TRUE,
  );

  $form['baidu_map_field_label_style'] = array(
    '#title' => t('Pin Label Style'),
    '#description' => t('Enter CSS to apply to the label as a JSON dictionary'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_label_style', ''),
  );

  $form['baidu_map_field_pin_icon'] = array(
    '#title' => t('Custom Pin Icon'),
    '#description' => t('Enter the full path to the icon to be used for map pins'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_pin_icon', ''),
  );

  $form['baidu_map_field_pin_icon_width'] = array(
    '#title' => t('Custom Pin Icon Width'),
    '#description' => t('Enter the width of the custom pin icon'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_pin_icon_width', ''),
  );

  $form['baidu_map_field_pin_icon_height'] = array(
    '#title' => t('Custom Pin Icon Height'),
    '#description' => t('Enter the height of the custom pin icon'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_pin_icon_height', ''),
  );

  return system_settings_form($form);
}
