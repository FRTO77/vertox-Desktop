import { Building2, Shield, Sparkles } from 'lucide-react';

const partners = [
  { 
    name: 'Microsoft', 
    logo: 'M',
    gradient: 'from-[#00A4EF] to-[#7FBA00]',
    description: 'Azure AI Partner'
  },
  { 
    name: 'Google Cloud', 
    logo: 'G',
    gradient: 'from-[#4285F4] to-[#34A853]',
    description: 'Translation API'
  },
  { 
    name: 'AWS', 
    logo: 'A',
    gradient: 'from-[#FF9900] to-[#232F3E]',
    description: 'Infrastructure'
  },
  { 
    name: 'Salesforce', 
    logo: 'S',
    gradient: 'from-[#00A1E0] to-[#1798C1]',
    description: 'CRM Integration'
  },
  { 
    name: 'Zoom', 
    logo: 'Z',
    gradient: 'from-[#2D8CFF] to-[#0B5CFF]',
    description: 'Video Platform'
  },
  { 
    name: 'Slack', 
    logo: 'S',
    gradient: 'from-[#E01E5A] to-[#36C5F0]',
    description: 'Communication'
  },
];

const stats = [
  { icon: Building2, value: '500+', label: 'Enterprise Clients' },
  { icon: Shield, value: '99.9%', label: 'Uptime SLA' },
  { icon: Sparkles, value: '50M+', label: 'Translations' },
];

export function Partners() {
  return (
    <section className="space-y-8 py-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-primary uppercase tracking-wider">
          Trusted Worldwide
        </p>
        <h2 className="text-2xl font-semibold">
          Powering Global Communication
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Integrated with the platforms you already use
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {partners.map((partner, index) => (
          <div 
            key={partner.name}
            className="group relative glass-card p-5 hover-lift cursor-pointer overflow-hidden"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Gradient Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative flex flex-col items-center text-center space-y-3">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partner.gradient} flex items-center justify-center font-bold text-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {partner.logo}
              </div>
              <div>
                <p className="font-semibold text-sm">{partner.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{partner.description}</p>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${partner.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="glass-panel p-6 mt-8">
        <div className="grid grid-cols-3 gap-6 divide-x divide-border">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="flex flex-col items-center text-center px-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Certification Badges */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {['SOC 2 Certified', 'GDPR Compliant', 'ISO 27001', 'HIPAA Ready'].map((badge) => (
          <div 
            key={badge}
            className="px-4 py-2 rounded-full bg-secondary/50 border border-border text-xs font-medium text-muted-foreground flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5 text-primary" />
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}