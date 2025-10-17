
    export type RemoteKeys = 'cart/Cart';
    type PackageType<T> = T extends 'cart/Cart' ? typeof import('cart/Cart') :any;