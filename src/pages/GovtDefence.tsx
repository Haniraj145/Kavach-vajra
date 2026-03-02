import { motion } from "framer-motion";
import { Shield, Lock, Car, Radio, Building } from "lucide-react";
import { Link } from "react-router-dom";

const GovtDefence = () => (
  <div className="min-h-screen pt-20 px-4 pb-20">
    <div className="mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">🎖️ Restricted Section</p>
        <h1 className="font-display text-3xl font-bold md:text-5xl mb-4">
          GOVERNMENT, DEFENCE &<br />VIP PRIORITY CORRIDORS
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          AI-CER technology extends beyond emergency services — defence, VIP movement, and government operations.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {[
          { icon: Shield, title: "Defence Applications", desc: "Secure military convoy routing with AI-optimized green corridors through urban areas." },
          { icon: Car, title: "VIP Movement", desc: "Priority corridor creation for VIP convoys with minimal traffic disruption." },
          { icon: Building, title: "State Security", desc: "Integration with state security apparatus for critical operations and emergency protocols." },
        ].map((item) => (
          <div key={item.title} className="stat-card text-center">
            <item.icon className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-display text-sm font-bold mb-2">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="gradient-card rounded-2xl border border-accent/20 p-8 text-center">
        <Lock className="h-10 w-10 text-accent mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold mb-2">Secured Briefings Available</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Detailed briefings available on request for authorized government and defence personnel.
        </p>
        <a
          href="mailto:savelives@kavach.com?subject=Government%20%26%20Defence%20Enquiry"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground hover:opacity-90 transition-all"
        >
          Request a Briefing
        </a>
        <p className="text-xs text-muted-foreground mt-3">savelives@kavach.com · Confidential</p>
      </div>
    </div>
  </div>
);

export default GovtDefence;
