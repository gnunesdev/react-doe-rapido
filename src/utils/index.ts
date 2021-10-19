import cookie from 'cookie';

export const cleanPhone = (phone: string) => {
  const newPhone = phone.replace(/\D+/g, '');

  return newPhone;
};

export const getCookies = (req: any) => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
};
