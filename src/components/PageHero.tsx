type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <header className="px-6 pt-36 pb-24 hero-bg border-b hairline">
      <div className="max-w-3xl mx-auto text-center">
        {eyebrow && (
          <p className="fade-up eyebrow mb-9">{eyebrow}</p>
        )}
        <h1
          className="fade-up fade-up-delay-1 font-display text-display-sm sm:text-display-md text-ink mb-9 balanced"
          style={{ fontWeight: 800 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="fade-up fade-up-delay-2 text-lg sm:text-xl text-ink-soft leading-[1.7] max-w-2xl mx-auto balanced">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
