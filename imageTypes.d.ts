declare module '*.svg'
declare module "*.png" {
    const path: string;
    export default path;
}
declare module "*.jpg" {
    const path: string;
    export default path;
}

declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'