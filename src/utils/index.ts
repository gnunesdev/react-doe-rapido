export const cleanPhone = (phone: string) => {
  const newPhone = phone.replace(/\D+/g, '');

  return newPhone;
};
