import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//converting the file into a url
export const readFileAsDataUrl = (file: File | Blob):Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (typeof fileReader.result === 'string') return resolve(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  })
}