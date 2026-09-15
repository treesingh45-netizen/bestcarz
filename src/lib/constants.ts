export const BRAND = {
  name: 'BEST CARz',
  tagline: 'BUY • SALE • EXCHANGE',
  subtagline: 'ANY CAR • ANY MODEL',
  phone: '+92 321 0389000',
  phoneRaw: '+923210389000',
  whatsapp: '+92 321 0389000',
  whatsappRaw: '923210389000',
  address: 'St No 2 E Main Blvd DHA, Iqbal Park, Lahore, 54810, Pakistan',
  city: 'Lahore, Pakistan',
  hours: '11:00 AM – 8:00 PM',
  days: 'Monday – Saturday (Sunday by Appointment)',
  email: 'info@bestcarz.pk',
  facebook: 'https://www.facebook.com',
  linkedin: 'https://www.linkedin.com',
  googleMapsUrl: 'https://www.google.com/maps/place/BEST+CARZ+DHA/@31.4905615,74.3753832,17z/data=!4m6!3m5!1s0x3919052a15f510c1:0x81bca97f71affdfa!8m2!3d31.4905202!4d74.3779916!16s%2Fg%2F11fhn2cm9k?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=31.4905202,74.3779916&hl=en&z=17&output=embed',
};

export const createWhatsAppLink = (message: string) => {
  return `https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(message)}`;
};

export const formatPKR = (amount: number): string => {
  if (amount >= 10000000) {
    const crores = (amount / 10000000).toFixed(2);
    return `PKR ${crores} Crore`;
  }
  const lakhs = (amount / 100000).toFixed(2);
  return `PKR ${lakhs} Lakhs`;
};
