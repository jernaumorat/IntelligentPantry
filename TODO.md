TODO
====

- General / Global:
  - [ ] If net request fails on first load, app softlocks with no way to refresh. (Nathan)
  - [ ] Handle request failure. (Nathan)
  - [ ] Create first-run flow, pairing and configuring server (Nathan)
  - [ ] Set up persistant on-device k/v store for settings and cache (Nathan)
  - [X] Light/dark mode stylesheets, and app-wide stylesheets (Bonita)
  - [X] General and robust networking singleton (Nathan)
    - [ ] set up mDNS (Nathan and Blake)
    - [ ] Allow mDNS override in settings (Nathan)
  - [ ] Work out production build process (Nathan)
- PantryScreen:
  - [ ] Search (Bonita)
  - [ ] Alphabetical sectioning (Bonita)
  - [ ] Sort by alpha/quantity  (Bonita)
  - [X] Get detail from server for PantryDetail
- RobotScreen:
  - [X] Add server population and recall to presets
    - [X] Remove presets on long-press (Nathan)
  - [X] And API call to x/y buttons
  - [X] Directional buttons to modify x/y states (Bonita)
- SettingsScreen:
  - [ ] Style as native-looking sectionview (Blake)
  - [ ] Add pairing functionality (Blake)
  - [ ] Scan functionality (Blake)
  - [ ] Make dev-mode features disablable (Blake)
  - [ ] Add robot status and last scan