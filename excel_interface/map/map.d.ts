declare function htmlTable(obj: any): string;
declare let localEvent: number;
declare const southWest: any;
declare const northEast: any;
declare const bounds: any;
declare const osm: any;
declare const esri: any;
declare const s2_dry: any;
declare const s2_wet: any;
declare const white: any;
declare const map: any;
declare const all_classes: any;
declare const urban_non_urban: any;
declare const bank_distance: any;
declare const road_density: any;
declare const viirs: any;
declare const surf_dry: any;
declare const surf_wet: any;
declare const tex_b04: any;
declare const tex_b08: any;
declare const tex_b12: any;
declare const basemaps: {
    OpenStreetMap: any;
    'Esri WorldMap': any;
    'Dry Season 2019 (RGB)': any;
    'Wet Season 2019 (RGB)': any;
    'Without background': any;
};
declare const overlaymaps: {
    'Classification (All)': any;
    'Classification (Urb/Rur)': any;
    'Nighttime Lights 2019': any;
    'Distance to Banks': any;
    'Road Density': any;
    'Dry season SAR (Coh2 * Db)': any;
    'Wet season SAR (Coh2 * Db)': any;
    'PCA Texture Red': any;
    'PCA Texture NIR': any;
    'PCA Texture SWIR': any;
};
declare function addMarkers(themap: any, markername: any): void;