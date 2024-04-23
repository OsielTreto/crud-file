export {};

declare global {
  interface IFiles {
    _id: string;
    nombre: string;
    extension: string;
    fechaCarga: string;
  }
}
