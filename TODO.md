TODO
====

- General / Global:
  - [ ] If net request fails on first load, app softlocks with no way to refresh. Handle request failure.
  - [ ] Create first-run flow, pairing and configuring server
  - [ ] Set up persistant on-device k/v store for settings and cache (Nathan)
  - [ ] Make dev-mode features disablable
  - [ ] Light/dark mode stylesheets, and app-wide stylesheets (Bonita)
  - [X] General and robust networking singleton (Nathan)
    - [ ] set up mDNS (Nathan and Blake)
    - [ ] Allow mDNS override in settings (Nathan)
  - [ ] Work out production build process
  - [ ] Replace all `props: any` with prop types or objects.
- PantryScreen:
  - [ ] Search (Bonita)
  - [ ] Alphabetical sectioning (Bonita)
  - [ ] Sort by alpha/quantity  (Bonita)
  - [X] Get detail from server for PantryDetail
- RobotScreen:
  - [ ] Style up X/Y and buttons a little more clearly (Bonita)
  - [X] Add server population and recall to presets
    - [X] Remove presets on long-press (Nathan)
  - [X] And API call to x/y buttons
  - [X] Directional buttons to modify x/y states (Bonita)
- SettingsScreen:
  - [ ] Style as native-looking sectionview
  - [ ] Add pairing functionality
  - [ ] Scan functionality