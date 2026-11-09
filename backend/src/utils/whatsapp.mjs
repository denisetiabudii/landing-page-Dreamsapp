export const generalMessage =
  "Halo DREAMS, saya ingin bertanya tentang aplikasi DREAMS.";

export function demoRequestMessage({ name, organization, preferred_time }) {
  return `Halo DREAMS, saya ${name} dari ${organization}. Saya sudah mengisi form permintaan demo (waktu yang diinginkan: ${preferred_time}). Mohon konfirmasi jadwalnya.`;
}

export function buildWhatsappUrl(number, text) {
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
