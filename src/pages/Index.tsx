import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, AlertTriangle, TrendingDown, Clock, Zap, Shield, Brain, Activity, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import CitySelector from "@/components/CitySelector";
import HospitalFinder from "@/components/HospitalFinder";

const LiveCounter = () => {
  const [count, setCount] = useState(0);
  const deathsPerSecond = 474 / 86400;
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const secondsElapsed = (now.getTime() - startOfYear.getTime()) / 1000;
  const baseCount = Math.floor(secondsElapsed * deathsPerSecond);

  useEffect(() => {
    setCount(baseCount);
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, Math.round(1000 / deathsPerSecond));
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gradient-card rounded-2xl border border-border p-6 md:p-8 max-w-2xl mx-auto">
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 text-center mb-4">
        <p className="text-xs font-semibold text-accent flex items-center justify-center gap-1">
          <AlertTriangle className="h-3 w-3" /> THESE ARE ROAD DEATHS ONLY
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          The true total including cardiac arrests, strokes & other medical emergencies is significantly higher
        </p>
      </div>

      <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-2">
        Road Deaths in India — Live (2026)
      </p>
      <p className="stat-value text-5xl md:text-6xl font-bold text-destructive text-center counter-tick">
        {count.toLocaleString()}
      </p>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Based on <strong className="text-foreground">474 road deaths per day</strong> (MoRTH 2023)
      </p>
    </div>
  );
};

const HeartbeatSVG = () => (
  <svg viewBox="0 0 800 100" className="w-full max-w-2xl mx-auto my-6 heartbeat-line" style={{ height: 60 }}>
    <path
      d="M0,50 L200,50 L230,50 L250,20 L270,80 L290,10 L310,90 L330,30 L350,50 L400,50 L800,50"
      fill="none"
      stroke="hsl(0 80% 55%)"
      strokeWidth="2"
    />
  </svg>
);

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="gradient-hero relative flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="h-16 w-16 text-destructive mx-auto mb-6 pulse-glow" />
           <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 px-2">
            WHAT IF <span className="text-gradient-primary">YOUR LOVED ONE</span>
            <br className="hidden sm:block" /><span className="sm:hidden"> </span>NEEDED AN AMBULANCE
            <br className="hidden sm:block" /><span className="sm:hidden"> </span><span className="text-destructive">RIGHT NOW?</span>
          </h1>
        </motion.div>

        <HeartbeatSVG />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Every minute of delay can be the difference between <strong className="text-foreground">life and death</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Link
            to="/solution"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
          >
            <Zap className="h-5 w-5" /> Discover Our Solution
          </Link>
          <Link
            to="/crisis"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-8 py-4 text-base font-medium text-secondary-foreground transition-colors hover:bg-muted"
          >
            Learn About The Crisis
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      {/* Live Counter */}
      <section className="py-20 px-4">
        <LiveCounter />
      </section>

      {/* Stats Cards */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">The Harsh Reality</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">INDIA'S EMERGENCY RESPONSE CRISIS</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="stat-card text-center">
              <Clock className="h-8 w-8 text-accent mx-auto mb-3" />
              <p className="stat-value text-4xl font-bold text-accent">20-30min</p>
              <p className="text-sm text-muted-foreground mt-2">Reported average ambulance response times in Indian metros</p>
            </div>
            <div className="stat-card text-center">
              <TrendingDown className="h-8 w-8 text-destructive mx-auto mb-3" />
              <p className="stat-value text-4xl font-bold text-destructive">474</p>
              <p className="text-sm text-muted-foreground mt-2">Road deaths every single day in India (2023)</p>
            </div>
            <div className="stat-card text-center">
              <Activity className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="stat-value text-4xl font-bold">1,72,890</p>
              <p className="text-sm text-muted-foreground mt-2">Total road deaths in India in 2023 — highest ever recorded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Golden Hour */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl gradient-card rounded-2xl border border-border p-8 md:p-12">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-accent mb-2">Emergency Medicine Concept</p>
            <h2 className="font-display text-2xl font-bold md:text-3xl">THE GOLDEN HOUR</h2>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            In emergency medicine, the "Golden Hour" refers to the period immediately after a traumatic injury during which prompt medical treatment can prevent death.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl border border-border bg-secondary/30">
              <Heart className="h-6 w-6 text-destructive mx-auto mb-2" />
              <p className="stat-value text-2xl font-bold">90%</p>
              <p className="text-xs text-muted-foreground mt-1">Heart attack survival with treatment under 60 min</p>
            </div>
            <div className="text-center p-4 rounded-xl border border-border bg-secondary/30">
              <Brain className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="stat-value text-2xl font-bold">85%</p>
              <p className="text-xs text-muted-foreground mt-1">Stroke patients recover better within 60 min</p>
            </div>
            <div className="text-center p-4 rounded-xl border border-border bg-secondary/30">
              <AlertTriangle className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="stat-value text-2xl font-bold">3x</p>
              <p className="text-xs text-muted-foreground mt-1">Higher survival for trauma in golden hour</p>
            </div>
          </div>
        </div>
      </section>

      {/* City Selector */}
      <CitySelector />

      {/* Hospital Finder */}
      <HospitalFinder />

      {/* Made in India */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">🇮🇳 Made in India, for the World</p>
          <h2 className="font-display text-3xl font-bold mb-4 md:text-4xl">
            A HOMEGROWN SOLUTION<br />TO A GLOBAL CRISIS
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            While the world builds smart cities, we're building smart emergency systems — because technology should save lives first.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="stat-card">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-sm font-bold mb-2">AI-Powered Prediction</h3>
              <p className="text-xs text-muted-foreground">Analyses traffic patterns in real-time to predict optimal routes</p>
            </div>
            <div className="stat-card">
              <Activity className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-sm font-bold mb-2">Dynamic Signal Control</h3>
              <p className="text-xs text-muted-foreground">Adjusts traffic signals to create green corridors automatically</p>
            </div>
            <div className="stat-card">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-sm font-bold mb-2">25-40% Faster Response</h3>
              <p className="text-xs text-muted-foreground">Based on internal simulation data. Results will vary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 gradient-hero">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold mb-4 md:text-4xl">LET'S SAVE LIVES TOGETHER</h2>
          <p className="text-lg text-muted-foreground mb-8">"The next life saved may be someone you love."</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/request-demo" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground glow-primary hover:opacity-90 transition-all">
              Request Demo
            </Link>
            <Link to="/join-us" className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground hover:opacity-90 transition-all">
              Join the Movement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
