export const clearMask = (value: string) => {
  const newValue = value ? value.replace(/\D+/g, '') : '';
  return newValue;
};
