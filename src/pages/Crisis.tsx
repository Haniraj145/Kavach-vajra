import { AlertTriangle, TrendingDown, Clock, Heart, Brain, Skull } from "lucide-react";
import { motion } from "framer-motion";

const Crisis = () => (
  <div className="min-h-screen pt-20 px-4 pb-20">
    <div className="mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-destructive mb-2">Understanding</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl mb-4">THE CRISIS</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          India's emergency response infrastructure is critically overburdened. Every delay costs lives.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="stat-card">
          <TrendingDown className="h-8 w-8 text-destructive mb-3" />
          <p className="stat-value text-4xl font-bold text-destructive">474</p>
          <p className="text-sm font-semibold mt-1">Road Deaths Per Day</p>
          <p className="text-xs text-muted-foreground mt-2">Source: MoRTH Road Accidents in India 2023</p>
        </div>
        <div className="stat-card">
          <Clock className="h-8 w-8 text-accent mb-3" />
          <p className="stat-value text-4xl font-bold text-accent">20-30 min</p>
          <p className="text-sm font-semibold mt-1">Average Ambulance Response Time</p>
          <p className="text-xs text-muted-foreground mt-2">Well above WHO recommended benchmarks</p>
        </div>
        <div className="stat-card">
          <Skull className="h-8 w-8 text-destructive mb-3" />
          <p className="stat-value text-4xl font-bold">1,72,890</p>
          <p className="text-sm font-semibold mt-1">Total Road Deaths in 2023</p>
          <p className="text-xs text-muted-foreground mt-2">Highest ever recorded in India</p>
        </div>
        <div className="stat-card">
          <Heart className="h-8 w-8 text-destructive mb-3" />
          <p className="stat-value text-4xl font-bold">32,457</p>
          <p className="text-sm font-semibold mt-1">Heart Attack Deaths (2022)</p>
          <p className="text-xs text-muted-foreground mt-2">India accounts for ~20% of global heart attack deaths</p>
        </div>
      </div>

      <div className="gradient-card rounded-2xl border border-border p-8">
        <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" /> The Golden Hour
        </h2>
        <p className="text-muted-foreground mb-6">
          In emergency medicine, the "Golden Hour" refers to the period immediately after a traumatic injury during which there is the highest likelihood that prompt medical treatment can prevent death.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-secondary/30 p-4 text-center">
            <p className="stat-value text-2xl font-bold text-destructive">8.8%</p>
            <p className="text-xs text-muted-foreground mt-1">Global survival to hospital discharge for cardiac arrest</p>
          </div>
          <div className="rounded-xl border border-border bg-secondary/30 p-4 text-center">
            <p className="stat-value text-2xl font-bold text-accent">~50%</p>
            <p className="text-xs text-muted-foreground mt-1">Heart attack deaths occur at home due to delays</p>
          </div>
          <div className="rounded-xl border border-border bg-secondary/30 p-4 text-center">
            <p className="stat-value text-2xl font-bold text-primary">~20%</p>
            <p className="text-xs text-muted-foreground mt-1">India's share of global heart attack deaths</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Crisis;
