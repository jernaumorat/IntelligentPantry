Database Schema
---------------

## List of Tables
- pantry_item – all items, images, quantities
- pantry_audit – transaction reciepts for all changes to pantry_item
- robot_preset – robot position presets
- pairing_code — codes created to generate bearer token on new device
- auth_token – all bearer tokens

## pantry_item
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| item_id | autoincrement | PK | Numeric unique ID of item - may become guid or similar pending client feedback |
| item_label | string | not null | Textual description of item |
| item_image | binary | none | Image of item or placeholder, not required |
| item_quantity | integer | not null | Quantity of item present - if zero will not appear in app |

## pantry_audit
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| reciept_id | autoincrement | PK | Reciept ID |
| reciept_time | datetime | not_null | Reciept timestamp |
| item_id | integer | FK, not null | ID of item modified |
| label_old | string | none | Old label, if null, new item or no change |
| label_new | string | none | New label, if null, no change |
| image_old | binary | none | Old image, if null, new item or no change |
| image_new | binary | none | New image, if null, no change |
| quant_old | integer | none | Old quantity, if null, new item or no change |
| quant_new | integer | none | New quantity, if null, no change |

## robot_preset
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| preset_id | autoincrement | PK | Preset ID |
| preset_label | string | none | Description of preset |
| preset_x | integer | not_null | x-coord of preset |
| preset_y | integer | not_null | y-coord of preset |

## pairing_code
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| pair_code | string | PK | 4 random alphanumeric characters |
| pair_expiry | datetime | not null | time code expires |

## auth_token
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| token_str | string | PK | base64-encoded random data, long (60ish char) |
| token_birth | datetime | not null | datetime code generated |