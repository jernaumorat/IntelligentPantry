import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import { StorageManager, SM } from "./StorageManager";

export const DEFAULT_URL = {
    http: 'http://intpantry._http._tcp.local:5000',
    https: 'http://intpantry._http._tcp.local:5000'
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
    url: { http: string, https: string },
    cameraUrl(): string,

    getPantryItems(): Promise<PItem[]>,
    getPantryDetail(id: number): Promise<PDetail>,
    getPresets(): Promise<Preset[]>,
    getStatus(): Promise<Status>,

    postPreset(preset: Preset): Promise<Preset | null>,
    postCoords(coords: Coords): Promise<boolean>,
    postScan(): Promise<boolean>,

    deletePreset(preset: Preset): Promise<boolean>
}

export namespace NetworkManager {

    export const cameraUrl = async () => {
        let url = (await StorageManager.getURL()).https + '/robot/camera'
        return url
    }

    export const getPantryItems = async () => {
        let pitems: PItem[];
        let url = (await StorageManager.getURL()).https

        const res = await fetch(url + '/pantry/');
        pitems = await res.json();

        for (let item of pitems) {
            item.uri = url + '/pantry/' + item.id.toString() + '/img'
        }

        return pitems;
    }

    export const getPantryDetail = async (id: number) => {
        let pitem: PDetail;
        let url = (await StorageManager.getURL()).https

        const res = await fetch(url + '/pantry/' + id);
        pitem = await res.json();

        pitem.coords = { x: pitem.x, y: pitem.y }
        pitem.uri = url + '/pantry/' + pitem.id.toString() + '/img'

        return pitem;
    }

    export const getPresets = async () => {
        let presets: Preset[];

        const res = await fetch((await StorageManager.getURL()).https + '/robot/presets');
        presets = await res.json();

        for (let item of presets) {
            item.coords = { x: Number(item.presetX), y: Number(item.presetY) }
        }

        return presets;
    }

    export const getStatus = async () => {
        let status: Status;

        const res = await fetch((await StorageManager.getURL()).https + '/robot/status');
        status = await res.json();

        return status;
    }

    export const postPreset = async (preset: Preset) => {
        const res = await fetch((await StorageManager.getURL()).https + '/robot/presets', {
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
    }

    export const postCoords = async (coords: Coords) => {
        const res = await fetch((await StorageManager.getURL()).https + '/robot/control', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ x: coords.x, y: coords.y })
        });
        return res.status === 200;
    }

    export const postScan = async () => {
        const res = await fetch((await StorageManager.getURL()).https + '/robot/scan', {
            method: 'POST'
        });
        return res.status === 200;
    }

    export const deletePreset = async (preset: Preset) => {
        const res = await fetch((await StorageManager.getURL()).https + '/robot/presets/' + preset.presetId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return res.status === 200;
    }
}
