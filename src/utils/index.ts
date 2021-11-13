export const clearMask = (value: string) => {
  const newValue = value.replace(/\D+/g, '');
  return newValue;
};
