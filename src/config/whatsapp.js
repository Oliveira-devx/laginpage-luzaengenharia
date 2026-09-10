export const WHATSAPP_NUMBER = "558681370834";

export function createWhatsAppUrl(message) {
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (!cleanNumber || cleanNumber.includes("XXXXXXXX")) {
    return "#";
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
