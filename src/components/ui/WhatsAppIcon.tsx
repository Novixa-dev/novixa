import React from 'react';

/**
 * WhatsApp's glyph, inlined as SVG. Used purely as a recognizable visual
 * reference to the real, widely-used product (e.g. "fragmented tools
 * include WhatsApp") — not as a link to a Novixa WhatsApp account, since
 * none exists yet. Kept as a one-off inline SVG rather than a new icon
 * library dependency: lucide-react (used everywhere else in the UI) has
 * no brand/logo icon set, and pulling in a second icon library for one
 * glyph would mix icon families across the interface.
 */
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 22h-.004c-1.828 0-3.622-.492-5.19-1.42l-.373-.221-3.858 1.012 1.03-3.76-.243-.386A9.921 9.921 0 0 1 2.05 12c.001-5.507 4.483-9.989 9.999-9.989 2.67.001 5.176 1.041 7.06 2.926a9.918 9.918 0 0 1 2.924 7.06c-.002 5.508-4.484 9.99-9.983 9.99M20.5 3.488A11.822 11.822 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.876 11.876 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.442-8.413" />
  </svg>
);
