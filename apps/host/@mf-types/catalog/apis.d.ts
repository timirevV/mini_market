
    export type RemoteKeys = 'catalog/Catalog';
    type PackageType<T> = T extends 'catalog/Catalog' ? typeof import('catalog/Catalog') :any;