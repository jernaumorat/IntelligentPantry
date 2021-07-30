All Endpoints
-------------

| Path | Accepted Methods |
| ---- | ---------------- |
| `/` | GET |
| `/cert` | GET |
| `/pantry/` | GET, POST |
| `/pantry/[itemID]` | GET, PUT, DELETE |
| `/knownitems/` | GET |
| `/knownitems/[itemID]` | GET, PUT, DELETE |
| `/history/` | GET |
| `/presets/` | GET, POST |
| `/presets/[presetID]` | POST, PUT, DELETE |
| `/control/` | POST |
| `/control/up` | POST |
| `/control/right` | POST |
| `/control/down` | POST |
| `/control/left` | POST |

Endpoint Description
--------------------

All endpoints accept OPTIONS requests, which will return the allowed methods as well as server headers.
Additionally, all endpoints require a valid bearer token, a missing or invalid bearer will result in a 401 Unauthorized response status and no response body.
All GET requests that do not return a single item support pagination with URL parameters: `size=n` will return `n` results, `page=i` will return `n` results, starting from the `n * i`th result. `page` cannot be used without `size`, and if `size` is provided without `page`, the first `n` results will be returned. By default all matching records will be returned. 

## `/`, `/cert`
The `/` endpoint accepts a GET request only, and returns a listing of all available API endpoints.

The `/cert` endpoint accepts a GET request only, and returns the TLS self-signed cert of the server.

## `/pantry/`, `/knownitems`, `/history`
The `/pantry/` endpoint responds to GET and POST requests. GET requests return a listing of item IDs with a quantity > 0; POSTs add a new item to the pantry: this requires a title and quantity, and optionally an image.

`/pantry/[itemID]` GET requests return item detail: including title, image, and quantity; PUT requests update any data of the item; and DELETE requests set the quantity of the item to 0.

`/knownitems/` and `/knownitems/[itemID]` requests are functionally the same as `/pantry/` requests, but do not filter for quantity > 0. DELETE requests made to `/knownitems/[itemID]` will flag the item as removed from the database (will not appear in queries, but will not actually be deleted.

`/history` will accept a GET request only and will return all item transaction reciepts (created any time an item is updated).

All of the above GET requests that do not return a single item support filtering by title or quantity with the `label=x` or 'quantity=[<|>|<=|=>|<>]n' parameters.

## `/presets/`, `/control/`
`/presets/` GET requests will return a list of all camera position presets (titles and positions); POST requests will allow creating a new preset with `title` and `position` parameters (`parameter` must be in the form `(x,y)`).

`/presets/[presetID]` POST requests will recall the preset position, sending a command to the camera robot to move to the given position. PUT requests will update the title or position of the preset, DELETE requests will remove the preset from the database.

`/control/` requests will take a `position` parameter, and send a move command to the given position.

`/control/[direction]` POST requests can take a `magnitude` parameter, and will move the camera that many units in the given direction.
