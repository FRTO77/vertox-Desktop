const partners = [
  { name: 'Microsoft', logo: 'M' },
  { name: 'Google Cloud', logo: 'G' },
  { name: 'AWS', logo: 'A' },
  { name: 'Salesforce', logo: 'S' },
  { name: 'Zoom', logo: 'Z' },
  { name: 'Slack', logo: 'S' },
];

export function Partners() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-center">Trusted by Industry Leaders</h2>
      <div className="flex flex-wrap justify-center gap-8 py-6">
        {partners.map((partner) => (
          <div 
            key={partner.name}
            className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center font-semibold text-lg">
              {partner.logo}
            </div>
            <span className="text-sm font-medium hidden sm:block">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
