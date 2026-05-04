import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import BookingChat from '@/components/BookingChat';

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">BC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">BARBEARIA COXIPÓ</h1>
              <p className="text-xs text-muted-foreground">Estilo e Precisão</p>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(true)}
            className="hidden md:block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Agendar Agora
          </button>
        </div>
      </nav>

      {/* Hero Section - Asymmetric Layout */}
      <section className="pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Video/Image - Right Side */}
        <div className="absolute inset-0 right-0 w-1/2 max-md:w-full max-md:opacity-20">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/109480254/mXJeHhjZAnLgvPcVs8Fxdt/hero-barber-background-eM7pscQnkURkZ4xxrTFGML.webp"
            alt="Barber cutting hair"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/50 to-transparent"></div>
        </div>

        {/* Content - Left Side */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            {/* Animated line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-semibold text-sm tracking-widest">BEM-VINDO</span>
            </div>

            {/* Main heading */}
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Cortes Modernos,
              <span className="text-primary"> Barba na Régua</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Um refúgio para o homem que valoriza cuidado pessoal e um bom papo. Experiência premium em cada detalhe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setChatOpen(true)}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/50"
              >
                Agendar Horário
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/10 transition-all">
                Conhecer Serviços
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-primary">1.2K+</p>
                <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <p className="text-2xl font-bold text-primary">8+</p>
                <p className="text-sm text-muted-foreground">Anos de Experiência</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-primary" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6">
                Tradição e <span className="text-primary">Modernidade</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Na Barbearia Coxipó, combinamos técnicas clássicas com tendências modernas para oferecer os melhores cortes e tratamentos para barba. Com profissionais experientes e ambiente acolhedor, proporcionamos uma experiência completa.
              </p>
              <ul className="space-y-3">
                {['Cortes personalizados e exclusivos', 'Barba feita na régua', 'Ambiente descontraído', 'Atendimento de qualidade'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3"></div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/109480254/mXJeHhjZAnLgvPcVs8Fxdt/golden-line-pattern-dVSuMmLj9A5RK7WBcsmj7B.webp"
                alt="Pattern"
                className="relative rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Nossos Serviços</h3>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">Oferecemos uma variedade de serviços premium para cuidar da sua imagem</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Corte de Cabelo', time: '30 min', price: 'R$ 50' },
              { name: 'Barba na Régua', time: '20 min', price: 'R$ 35' },
              { name: 'Corte + Barba', time: '50 min', price: 'R$ 80' },
              { name: 'Hidratação', time: '25 min', price: 'R$ 40' },
            ].map((service, i) => (
              <div key={i} className="bg-secondary p-6 rounded-lg border border-border hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/20 rounded-lg mb-4 group-hover:bg-primary/30 transition-colors"></div>
                <h4 className="font-bold text-lg mb-2">{service.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{service.time}</p>
                <p className="text-primary font-bold text-lg">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Pronto para transformar sua imagem?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Agende seu horário agora e experimente o melhor atendimento em barbearia</p>
          <button
            onClick={() => setChatOpen(true)}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/50"
          >
            Agendar Agora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Barbearia Coxipó</h4>
              <p className="text-sm text-muted-foreground">Estilo e Precisão</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <p className="text-sm text-muted-foreground">📞 (65) 9999-9999</p>
              <p className="text-sm text-muted-foreground">📍 Cuiabá, MT</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Horário</h4>
              <p className="text-sm text-muted-foreground">Seg-Sex: 9h às 18h</p>
              <p className="text-sm text-muted-foreground">Sab: 9h às 17h</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Barbearia Coxipó. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Booking Chat */}
      <BookingChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
