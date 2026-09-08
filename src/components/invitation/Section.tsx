import { Reveal } from '@/components/Reveal';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-3xl">
        <Reveal className="text-center">
          {eyebrow ? (
            <p className="mb-4 text-xs uppercase tracking-widest text-gold-500">{eyebrow}</p>
          ) : null}
          <h2 className="font-serif text-3xl font-light tracking-wide text-sage-800 sm:text-4xl">
            {title}
          </h2>
          <div className="divider mt-6" aria-hidden="true">
            <span className="text-[0.6rem]">&#9670;</span>
          </div>
        </Reveal>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
