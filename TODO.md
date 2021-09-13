TODO
====

- General / Global:
  - [ ] If net request fails on first load, app softlocks with no way to refresh. Handle request failure.
  - [ ] Create first-run flow, pairing and configuring server
  - [ ] Set up persistant on-device k/v store for settings and cache
  - [ ] Make dev-mode features disablable
  - [ ] Light/dark mode stylesheets, and app-wide stylesheets (Bonita-working)
  - [ ] General and robust networking singleton
    - [ ] set up mDNS
    - [ ] Allow mDNS override in settings
  - [ ] Work out production build process
- PantryScreen:
  - [ ] Search (Bonita)
  - [ ] Alphabetical sectioning (Bonita)
  - [ ] Sort by alpha/quantity  (Bonita)
  - [ ] Get detail from server for PantryDetail
- RobotScreen:
  - [ ] Style up X/Y and buttons a little more clearly (Bonita)
  - [ ] Add server population and recall to presets
    - [ ] Remove presets on long-press
  - [ ] And API call to x/y buttons
  - [ ] Directional buttons to modify x/y states (Bonita)
- SettingsScreen:
  - [ ] Style as native-looking sectionview
  - [ ] Add pairing functionality
  - [ ] Scan functionality