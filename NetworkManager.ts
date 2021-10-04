export const DEFAULT_URL = {
    http: 'http://intpantry._http._tcp.local:5000',
    https: 'https://intpantry._https._tcp.local:5000'
}

export interface Coords {
    x: number,
    y: number
}

export interface PItem {
    id: number,
    uri: string,
    label: string,
    quantity: number,
}

export interface PDetail extends PItem {
    x: number,
    y: number,
    coords: Coords
}

export interface Preset {
    presetId: number,
    label: string,
    coords: Coords,
    presetX: number | null,
    presetY: number | null
}

export interface Status {
    state: 'Scanning' | 'Processing' | 'Idle',
    lastScan: Date
}

interface NM {
    url: string,

    getPantryItems(): Promise<PItem[]>,
    getPantryDetail(id: number): Promise<PDetail>,
    getPresets(): Promise<Preset[]>,
    getStatus(): Promise<Status>,

    postPreset(preset: Preset): Promise<Preset | null>,
    postCoords(coords: Coords): Promise<boolean>,
    postScan(): Promise<boolean>,

    deletePreset(preset: Preset): Promise<boolean>
}

export const NetworkManager = () => {
    let instance: NM;
    let url = 'http://192.168.0.248:5000';

    const createInstance = () => {
        return {
            url: url,
            getPantryItems: async () => {
                let pitems: PItem[];

                const res = await fetch(url + '/pantry');
                pitems = await res.json();

                for (let item of pitems) {
                    item.uri = url + '/pantry/' + item.id.toString() + '/img'
                }

                return pitems;
            },
            getPantryDetail: async (id) => {
                let pitem: PDetail;

                const res = await fetch(url + '/pantry/' + id);
                pitem = await res.json();
                pitem.coords = { x: pitem.x, y: pitem.y }

                return pitem;
            },
            getPresets: async () => {
                let presets: Preset[];

                const res = await fetch(url + '/robot/presets');
                presets = await res.json();

                for (let item of presets) {
                    item.coords = { x: Number(item.presetX), y: Number(item.presetY) }
                }

                return presets;
            },
            getStatus: async () => {
                let status: Status;

                const res = await fetch(url + '/robot/status');
                status = await res.json();

                return status;
            },
            postPreset: async (preset) => {
                const res = await fetch(url + '/robot/presets', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ label: preset.label, preset_x: preset.coords.x, preset_y: preset.coords.y })
                })

                if (res.status === 201) {
                    let ret: Preset = await res.json()
                    ret.coords = { x: Number(ret.presetX), y: Number(ret.presetY) }
                    return ret
                } else {
                    return null
                }
            },
            postCoords: async (coords) => {
                const res = await fetch(url + '/robot/control', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ x: coords.x, y: coords.y })
                });
                return res.status === 200;
            },
            postScan: async () => {
                const res = await fetch(url + '/robot/scan', {
                    method: 'POST'
                });
                return res.status === 200;
            },
            deletePreset: async (preset) => {
                const res = await fetch(url + '/robot/presets/' + preset.presetId, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                return res.status === 200;
            }
        } as NM
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    }
}