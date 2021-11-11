export function blobToBase64(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onloadend = (_) => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
