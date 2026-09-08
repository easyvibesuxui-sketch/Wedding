/** Gold filigree rule used under section headings. */
export function Flourish({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={`h-5 w-52 text-gold-300 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M8 12h60" strokeLinecap="round" />
      <path d="M172 12h60" strokeLinecap="round" />
      <path d="M68 12c8 0 10-6 18-6s10 6 18 6" />
      <path d="M172 12c-8 0-10 6-18 6s-10-6-18-6" />
      <path d="M104 12c6 0 10 4 16 4s10-4 16-4" />
      <path d="M136 12c-6 0-10-4-16-4s-10 4-16 4" />
      <path d="M120 6.5l3.2 5.5-3.2 5.5-3.2-5.5z" fill="currentColor" stroke="none" />
      <circle cx="6" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="234" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
