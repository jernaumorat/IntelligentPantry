import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import { StorageManager } from "./StorageManager";

export const DEFAULT_URL = 'http://intpantry._http._tcp.local:5000'

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

export namespace NetworkManager {

    export const cameraUrl = async () => {
        let url = await StorageManager.getURL() + '/robot/camera'

        return url
    }

    export const getRoot = async () => {
        let url = await StorageManager.getURL()

        let res = await fetch(url + '/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return await res.json()
    }

    export const getPairingCode = async () => {
        let url = await StorageManager.getURL() + '/pair'
        let bearer = await StorageManager.getToken()
        let res: Response

        if (bearer) {
            res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + bearer
                }
            })
        } else {
            res = await fetch(url)
        }
        let code = await res.json()

        return code
    }

    export const getToken = async (code: string) => {
        let url = await StorageManager.getURL()
        let res = await fetch(url + '/pair?code=' + code)

        let token = await res.json()

        return token
    }

    export const getPantryItems = async () => {
        let pitems: PItem[];
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/pantry/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
            }
        })
        pitems = await res.json();

        for (let item of pitems) {
            item.uri = url + '/pantry/' + item.id.toString() + '/img'
        }

        return pitems;
    }

    export const getPantryDetail = async (id: number) => {
        let pitem: PDetail;
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/pantry/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
            }
        })
        pitem = await res.json();

        pitem.coords = { x: pitem.x, y: pitem.y }
        pitem.uri = url + '/pantry/' + pitem.id.toString() + '/img'

        return pitem;
    }

    export const getPresets = async () => {
        let presets: Preset[];
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/robot/presets', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
            }
        })
        presets = await res.json();

        for (let item of presets) {
            item.coords = { x: Number(item.presetX), y: Number(item.presetY) }
        }

        return presets;
    }

    export const getStatus = async () => {
        let status: Status;
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/robot/status', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
            }
        })
        status = await res.json();

        return status;
    }

    export const postPreset = async (preset: Preset) => {
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/robot/presets', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
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
    }

    export const postCoords = async (coords: Coords) => {
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/robot/control', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
            },
            body: JSON.stringify({ x: coords.x, y: coords.y })
        });

        return res.status === 200;
    }

    export const postScan = async () => {
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/robot/scan', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
            },
        });

        return res.status === 200;
    }

    export const deletePreset = async (preset: Preset) => {
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/robot/presets/' + preset.presetId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
            }
        })

        return res.status === 200;
    }

    export const deleteToken = async () => {
        let url = await StorageManager.getURL()
        let bearer = await StorageManager.getToken()

        const res = await fetch(url + '/pair', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearer
            }
        })

        return res.status === 200;
    }
}
