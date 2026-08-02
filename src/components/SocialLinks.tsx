import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Send, Share2 } from 'lucide-react';
import { SOCIAL_PLATFORMS } from '../config/socials';

export const SocialLinks: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Twitter':
        return <span className="font-bold text-lg">𝕏</span>;
      case 'Send':
        return <Send className="w-5 h-5 text-sky-400" />;
      default:
        return <ExternalLink className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <section id="socials" className="py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Share2 className="w-3.5 h-3.5" />
            <span>Space Colony Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Official Social Media & Links
          </h2>
          <p className="text-neutral-400 text-base">
            Connect directly with the MarsRat community and official channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4">
          {SOCIAL_PLATFORMS.map((platform, idx) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`p-5 rounded-2xl border transition duration-300 flex flex-col justify-between group shadow-xl ${
                platform.featured
                  ? 'bg-neutral-900 border-orange-500/50 hover:border-orange-400'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:scale-110 transition duration-300">
                    {getIcon(platform.icon)}
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-orange-400 transition" />
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-orange-300 transition">
                  {platform.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{platform.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};


