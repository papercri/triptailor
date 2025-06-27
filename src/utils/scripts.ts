export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(/[\s-]+/)  // divide por espacios o guiones
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');  // usar _ para el título de Wikipedia, que usa guiones bajos
}
  
