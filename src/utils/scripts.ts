export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(/[\s-]+/)  
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');  
}
  
