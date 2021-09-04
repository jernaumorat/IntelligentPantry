TODO
====

- Properly escape and handle db i/o
- Robust image handling
- Fill out remaining API endpoints
- Update database models to reflect client changes
  - Remove Audit/reciept model
  - Add time-scanned, x/y coords to item model
- Complete auth procedure, modify model to distinguish robot and user tokens
  - Add flask command to create robot token
- Set up deployment:
  - Set up lighttpd and fcgi to test production environment
  - add flask commands for first-run configuration (initial pairing code, generate server secret etc)
  - Test http/https deployment with self-signed cert, and installation of cert to mobile devices.
- Comment all code, at very least with descriptions of each endpoint.
- Unit test each endpoint/method
- Correctly handle all failure cases with HTTP codes, not just failing with 500s. (And success cases, 201 204 etc not just 200)
