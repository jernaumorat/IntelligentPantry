export interface Coords {
    x: number,
    y: number
}

export interface PItem {
    id: number,
    uri: string,
    label: string,
    quantity: number,
    coords: Coords | null
}

export interface Preset {
    presetId: number,
    label: string,
    coords: Coords,
    presetX: string | null,
    presetY: string | null
}

export interface Status {
    state: 'Scanning' | 'Processing' | 'Idle',
    lastScan: Date
}

interface NM {
    url: string,

    getPantryItems(): Promise<PItem[]>,
    getPantryDetail(id: number): Promise<PItem>,
    getPresets(): Promise<Preset[]>,
    getStatus(): Promise<Status>,

    postCoords(coords: Coords): Promise<boolean>,
    postScan(): Promise<boolean>
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
            getPantryDetail: async (id: number) => {
                let pitem: PItem;

                const res = await fetch(url + '/pantry/' + id);
                pitem = await res.json();

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
            postCoords: async (coords: Coords) => {
                const res = await fetch(url + '/robot/control', {
                    method: 'POST',
                    body: JSON.stringify({ x: coords.x, y: coords.y })
                });
                return res.status === 200;
            },
            postScan: async () => {
                const res = await fetch(url + '/robot/scan', {
                    method: 'POST'
                });
                return res.status === 200;
            }
        }
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