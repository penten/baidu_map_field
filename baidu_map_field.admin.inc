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
    '#description' => t('Enter CSS to apply to the label as a JSON dictionary (ex: {"color":"red"})'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_label_style', ''),
  );

  $form['baidu_map_field_pin_icon'] = array(
    '#title' => t('Custom Pin Icon'),
    '#description' => t('Enter the path to the icon to be used for map pins (ex: sites/all/themes/mytheme/pin.png)'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_pin_icon', ''),
  );

  $form['baidu_map_field_pin_icon_width'] = array(
    '#title' => t('Custom Pin Icon Width'),
    '#description' => t('Enter the width of the custom pin icon in pixels (ex: 50)'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_pin_icon_width', ''),
  );

  $form['baidu_map_field_pin_icon_height'] = array(
    '#title' => t('Custom Pin Icon Height'),
    '#description' => t('Enter the height of the custom pin icon in pixels (ex: 50)'),
    '#type' => 'textfield',
    '#default_value' => variable_get('baidu_map_field_pin_icon_height', ''),
  );

  return system_settings_form($form);
}

/**
 * Form validation handler for baidu_map_field_settings_form().
 */
function baidu_map_field_settings_form_validate($form, &$form_state) {

  if ($form_state['values']['baidu_map_field_label_style']) {
    $json = json_decode($form_state['values']['baidu_map_field_label_style']);
    if (!$json) {
      form_set_error('baidu_map_field_label_style', t('You must enter a valid JSON dictionary'));
    }
  }

  if ($form_state['values']['baidu_map_field_pin_icon_width'] &&
     !is_numeric($form_state['values']['baidu_map_field_pin_icon_width'])) {
    form_set_error('baidu_map_field_pin_icon_width', t('The custom pin icon width must be a number'));
  }

  if ($form_state['values']['baidu_map_field_pin_icon_height'] &&
     !is_numeric($form_state['values']['baidu_map_field_pin_icon_height'])) {
    form_set_error('baidu_map_field_pin_icon_width', t('The custom pin icon height must be a number'));
  }

  if ($form_state['values']['baidu_map_field_pin_icon'] &&
      !file_exists($form_state['values']['baidu_map_field_pin_icon'])) {
    form_set_error('baidu_map_field_pin_icon', t('The icon file does not exist'));
  }
}
