export const WHATSAPP_NUMBER = '5586994201843';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá, gostaria de ter uma consultoria gratuita!.',
)}`;

export const SITE_URL = 'https://www.zenbit.com.br';

/**
 * Brand images. Both live in /public and are referenced by absolute URL so they
 * resolve for crawlers and link previews.
 * - OG_IMAGE: 1200x630 card, dark background — the old logo.png was a white mark
 *   on a transparent background and rendered invisible in link previews.
 * - LOGO_IMAGE: 512x512 square, used as the Organization/publisher logo in JSON-LD.
 */
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_IMAGE = `${SITE_URL}/icon-512.png`;
