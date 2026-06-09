import { Phone, Globe } from "lucide-react";

export default function AboutContact() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mt-6 mb-16 text-center flex flex-col items-center justify-center text-white" id="about-official-contact">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#05461a]/60 to-black/80 border border-emerald-500/20 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl w-full">
        
        {/* Inner Decorative Accent */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 pb-8 border-b border-white/10 mb-8 max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center text-center">
            
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FFD54F] tracking-tight text-center">
              A Heritage City Awakens
            </h3>
            <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl font-medium text-center">
              For official administrative concerns, tourist arrangements, cultural inquiries, and city updates, connect directly with our local executive departments.
            </p>
          </div>
        </div>

        {/* Contact Details Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Mayor's Office */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 hover:border-[#70E000]/35 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#70E000]/10 border border-[#70E000]/20 flex items-center justify-center text-[#70E000]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                  City Mayor's Office
                </h4>
                <span className="text-[9px] font-mono text-white/40 block uppercase">
                  Executive Administration
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs font-mono text-white/80">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">BABA HOTLINE</span>
                <span className="text-[#FFD54F] font-bold text-sm">411-2222</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">OFFICE LINE 01</span>
                <span className="text-white font-bold">(038) 412-3715</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">OFFICE LINE 02</span>
                <span className="text-white font-bold">(038) 422-8011</span>
              </div>
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-white/50">FAX MACHINE</span>
                <span className="text-white/70">(038) 501-9350</span>
              </div>
            </div>
          </div>

          {/* Card 2: Tourism Office */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 hover:border-[#70E000]/35 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#70E000]/10 border border-[#70E000]/20 flex items-center justify-center text-[#70E000]">
                <Globe className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                  City Tourism Office
                </h4>
                <span className="text-[9px] font-mono text-white/40 block uppercase">
                  Tourism &amp; Cultural Affairs
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs font-mono text-white/80">
              <div className="flex flex-col gap-2 p-3 bg-white/5 border border-white/10 rounded-xl mb-3">
                <span className="text-[10px] font-mono text-[#FFD54F] uppercase font-bold tracking-wider">For Tours &amp; Information Contact:</span>
                <p className="text-xs font-sans text-white/95 leading-relaxed font-medium">
                  Reach out to coordinate heritage walks, digital guides, pottery workshops, and city permits.
                </p>
              </div>
              
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">DIRECT TELEPHONE</span>
                <span className="text-[#FFD54F] font-bold text-sm">(038) 411-2222</span>
              </div>
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-white/50">EXTENSION CODE</span>
                <span className="text-[#FFD54F] font-black uppercase bg-[#FFD54F]/15 px-2 py-0.5 rounded text-[10px]">
                  Local 167
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
