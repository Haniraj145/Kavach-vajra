import { Shield, Activity, Zap, Brain, Radio, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Solution = () => (
  <div className="min-h-screen pt-20 px-4 pb-20">
    <div className="mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Introducing</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl mb-2">KAVACH</h1>
        <p className="text-muted-foreground">powered by VAJRA Technology</p>
        <p className="text-muted-foreground max-w-xl mx-auto mt-4">
          VAJRA uses artificial intelligence to create green corridors in real-time, helping emergency vehicles reach patients faster.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {[
          { icon: Brain, title: "AI-Powered Prediction", desc: "Analyses traffic patterns in real-time to predict optimal routes for priority vehicles" },
          { icon: Radio, title: "Dynamic Signal Control", desc: "Automatically adjusts traffic signals to create green corridors ahead of the vehicle" },
          { icon: Zap, title: "25-40% Faster Response", desc: "Based on internal simulation data. Actual reduction depends on deployment conditions." },
          { icon: Shield, title: "Patent Filed", desc: "Indian Patent Office. Working simulation available for demonstration." },
          { icon: Activity, title: "Real-time Coordination", desc: "Hospital receives patient vitals before arrival. Ambulance crew prepared with case details." },
          { icon: Globe, title: "Scalable Globally", desc: "Designed to work with existing infrastructure. Subject to technical assessment per city." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card"
          >
            <item.icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-display text-sm font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="gradient-card rounded-2xl border border-primary/20 p-8 text-center">
        <p className="stat-value text-5xl font-bold text-gradient-primary mb-2">25-40%</p>
        <p className="font-display text-sm font-bold">Projected Travel Time Reduction</p>
        <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
          Internal simulation projects a 25-40% reduction in emergency vehicle travel time. That could mean arriving inside the critical window.
        </p>
      </div>
    </div>
  </div>
);

export default Solution;
