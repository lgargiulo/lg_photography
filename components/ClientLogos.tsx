'use client';

import { motion } from 'framer-motion';

const clients = [
  { name: 'Electric Dreams Festival', logo: 'ED' },
  { name: 'Cork Opera House', logo: 'COH' },
  { name: 'Cork Tech Alliance', logo: 'CTA' },
  { name: 'Irish Music Magazine', logo: 'IMM' },
  { name: 'The Loft Venues', logo: 'TLV' },
  { name: 'Cork City Marathon', logo: 'CCM' },
];

export default function ClientLogos() {
  return (
    <section className="section-padding bg-bg">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-text-muted mb-2">
            Official Partner
          </p>
          <a
            href="https://anoichecork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-2xl md:text-3xl font-display font-light hover:text-accent transition-colors"
          >
            anoichecork.com
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <div className="group relative w-full aspect-square flex items-center justify-center bg-bg-card border border-border hover:border-accent transition-all duration-300">
                {/* Logo placeholder - replace with actual logos */}
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-light text-text-muted group-hover:text-accent transition-colors">
                    {client.logo}
                  </div>
                  <div className="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {client.name}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
