export interface ManifestItem {
    label: string;
    slug: string;
    path?: string;
    description?: string;
    children?: ManifestItem[]
}

export interface ManifestGroup {
    label: string;
    items: ManifestItem[]
}

export interface Manifest {
    locale: string;
    service: string;
    groups: ManifestGroup[];
    platform: string
}