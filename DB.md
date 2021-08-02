Database Schema
---------------

## List of Tables
- PantryItems – all items, images, quantities
- PantryAudit – transaction reciepts for all changes to PantryItems
- RobotPresets – robot position presets
- PairingCodes — codes created to generate bearer token on new device
- AuthTokens – all bearer tokens

## PantryItems
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| item_id | autoincrement | PK | Numeric unique ID of item - may become guid or similar pending client feedback |
| item_label | string | not null | Textual description of item |
| item_image | binary | none | Image of item or placeholder, not required |
| item_quantity | integer | not null | Quantity of item present - if zero will not appear in app |

## PantryAudit
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| reciept_id | autoincrement | PK | Reciept ID |
| item_id | integer | FK, not null | ID of item modified |
| label_old | string | none | Old label, if null, new item or no change |
| label_new | string | none | New label, if null, no change |
| image_old | binary | none | Old image, if null, new item or no change |
| image_new | binary | none | New image, if null, no change |
| quant_old | integer | none | Old quantity, if null, new item or no change |
| quant_new | integer | none | New quantity, if null, no change |

## RobotPresets
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| preset_id | autoincrement | PK | Preset ID |
| preset_label | string | none | Description of preset |
| preset_x | integer | not_null | x-coord of preset |
| preset_y | integer | not_null | y-coord of preset |

## PairingCodes
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| pair_code | string | PK | 4 random alphanumeric characters |
| pair_expiry | datetime | not null | time code expires |

## AuthTokens
| Column Name | Datatype | Constraints | Description |
| ----------- | -------- | ----------- | ----------- |
| token_str | string | PK | base64-encoded random data, long (60ish char) |
| token_birth | datetime | not null | datetime code generated |