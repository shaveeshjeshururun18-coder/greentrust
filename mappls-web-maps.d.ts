// TypeScript declarations for mappls-web-maps package
declare module 'mappls-web-maps' {
    export class mappls {
        initialize(mapKey: string, callback: () => void): void;

        Map(options: {
            id: string;
            properties: {
                center: [number, number];
                zoom: number;
                zoomControl?: boolean;
                location?: boolean;
            };
        }): MapplsMap;
    }

    export class mappls_plugin {
        search(
            map: MapplsMap,
            options?: {
                [key: string]: any;
            }
        ): void;

        marker(options: {
            map: MapplsMap;
            position: [number, number];
            draggable?: boolean;
            icon?: string;
        }): MapplsMarker;
    }

    export interface MapplsMap {
        setCenter(latlng: [number, number]): void;
        getCenter(): { lat: number; lng: number };
        setZoom(zoom: number): void;
        on(event: string, callback: (e: any) => void): void;
        remove(): void;
    }

    export interface MapplsMarker {
        setPosition(latlng: [number, number]): void;
        getPosition(): { lat: number; lng: number };
        remove(): void;
    }
}
