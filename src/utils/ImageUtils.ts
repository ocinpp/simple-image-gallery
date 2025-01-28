const STORAGE_KEY = "gallery_images"

export function getImages(): string[] {
  const storedImages = localStorage.getItem(STORAGE_KEY)
  return storedImages ? JSON.parse(storedImages) : []
}

export function addImage(imageUrl: string): string[] {
  const images = getImages()
  const updatedImages = [...images, imageUrl]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages))
  return updatedImages
}

export function deleteImage(index: number): string[] {
  const images = getImages()
  const updatedImages = images.filter((_, i) => i !== index)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages))
  return updatedImages
}

