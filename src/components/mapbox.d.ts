import map from 'mapbox-gl';
declare global {
    export const mapboxgl: typeof map;
}