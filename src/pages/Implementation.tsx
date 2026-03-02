import { motion } from "framer-motion";
import { CheckCircle, Settings, Zap, Globe, Building, Radio } from "lucide-react";

const steps = [
  { icon: Settings, title: "Technical Assessment", desc: "City infrastructure evaluation, traffic pattern analysis, and signal compatibility check." },
  { icon: Building, title: "Pilot Deployment", desc: "Initial deployment in a controlled corridor with real-time monitoring and data collection." },
  { icon: Radio, title: "Integration", desc: "Connect with existing traffic management, emergency dispatch, and hospital systems." },
  { icon: Zap, title: "AI Optimization", desc: "Machine learning models trained on local traffic data for optimal green corridor creation." },
  { icon: Globe, title: "City-Wide Rollout", desc: "Gradual expansion across the city with continuous performance monitoring." },
  { icon: CheckCircle, title: "Continuous Improvement", desc: "Ongoing optimization based on real-world data and outcomes feedback." },
];

const Implementation = () => (
  <div className="min-h-screen pt-20 px-4 pb-20">
    <div className="mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Roadmap</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl mb-4">IMPLEMENTATION</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">How KAVACH gets deployed in your city — from assessment to full rollout.</p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="gradient-card rounded-xl border border-border p-6 flex-1">
                <p className="text-xs text-primary font-semibold mb-1">Step {i + 1}</p>
                <h3 className="font-display text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Implementation;
