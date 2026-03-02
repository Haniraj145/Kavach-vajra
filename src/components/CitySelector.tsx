import { useState, useMemo } from "react";
import { Search, MapPin, AlertTriangle, TrendingDown, Car, Users, DollarSign, Skull, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cityData, indianCities, internationalCities, CityData } from "@/data/cityData";
import { Link } from "react-router-dom";

const CitySelector = () => {
  const [selectedCity, setSelectedCity] = useState<CityData>(cityData[0]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredIndian = useMemo(
    () => indianCities.filter(c => c.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );
  const filteredIntl = useMemo(
    () => internationalCities.filter(c => c.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Interactive Tool</p>
        <h2 className="font-display text-3xl font-bold mb-4 md:text-4xl">HOW DOES YOUR CITY COMPARE?</h2>
        <p className="text-muted-foreground mb-4">Explore the scale of emergency response challenges across major cities.</p>
        <p className="text-xs text-accent mb-8 flex items-center justify-center gap-1">
          <AlertTriangle className="h-3 w-3" /> City-level impact projections are estimates based on research data and internal modelling.
        </p>

        {/* Dropdown */}
        <div className="relative mx-auto max-w-md mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3 text-left"
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {selectedCity.flag} {selectedCity.name}, {selectedCity.country}
            </span>
            <span className="text-muted-foreground">▾</span>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-auto rounded-lg border border-border bg-card shadow-2xl"
              >
                <div className="sticky top-0 bg-card p-2 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search city..."
                      className="w-full rounded-md bg-secondary pl-9 pr-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                      autoFocus
                    />
                  </div>
                </div>

                {filteredIndian.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-primary">🇮🇳 India</p>
                    {filteredIndian.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => { setSelectedCity(city); setIsOpen(false); setSearch(""); }}
                        className={`w-full px-6 py-2 text-left text-sm transition-colors hover:bg-primary/10 ${
                          selectedCity.name === city.name ? "bg-primary/20 text-primary" : "text-foreground"
                        }`}
                      >
                        {city.name}
                      </button>
                    ))}
                  </>
                )}
                {filteredIntl.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-stat-blue">🌍 International</p>
                    {filteredIntl.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => { setSelectedCity(city); setIsOpen(false); setSearch(""); }}
                        className={`w-full px-6 py-2 text-left text-sm transition-colors hover:bg-primary/10 ${
                          selectedCity.name === city.name ? "bg-primary/20 text-primary" : "text-foreground"
                        }`}
                      >
                        {city.name}, {city.country}
                      </button>
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* City Data Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCity.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="gradient-card rounded-2xl border border-border p-6 md:p-8 text-left"
          >
            <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {selectedCity.name}, {selectedCity.country}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-destructive" /> Estimated Avg. Delay
                </p>
                <p className="stat-value text-2xl md:text-3xl font-bold text-destructive">{selectedCity.avgDelay} min</p>
                <p className="text-xs text-muted-foreground mt-1">Industry estimates · Varies by location</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Car className="h-3 w-3" /> Traffic Congestion Index
                </p>
                <p className="stat-value text-2xl md:text-3xl font-bold text-foreground">{selectedCity.congestionIndex}/100</p>
                <p className="text-xs text-muted-foreground mt-1">Higher = More congested</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-secondary/30 p-3 md:p-4 text-center overflow-hidden">
                <p className="text-xs text-muted-foreground mb-1">Est. Annual Deaths</p>
                <p className="stat-value text-lg md:text-xl font-bold break-words">{selectedCity.annualDeaths.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Modelled estimate</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-3 md:p-4 text-center overflow-hidden">
                <p className="text-xs text-muted-foreground mb-1">Est. Economic Loss/Year</p>
                <p className="stat-value text-lg md:text-xl font-bold text-accent break-words">{selectedCity.economicLoss}</p>
                <p className="text-xs text-muted-foreground">Modelled estimate</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-3 md:p-4 text-center overflow-hidden">
                <p className="text-xs text-muted-foreground mb-1">Population</p>
                <p className="stat-value text-lg md:text-xl font-bold break-words">{selectedCity.population}</p>
              </div>
            </div>

            {/* Projected */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <h4 className="font-display text-sm font-bold text-primary mb-1 flex items-center gap-2">
                <Zap className="h-4 w-4" /> WITH KAVACH TECHNOLOGY (PROJECTED):
              </h4>
              <p className="text-xs text-accent mb-4 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> All figures below are projections based on simulation modelling. Actual results will vary.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center overflow-hidden">
                  <p className="stat-value text-xl md:text-2xl font-bold text-primary">{selectedCity.projectedDelay} min</p>
                  <p className="text-xs text-muted-foreground">Projected New Avg. Delay</p>
                  <p className="text-xs text-primary font-semibold">{selectedCity.projectedFasterPercent}% projected faster</p>
                </div>
                <div className="text-center overflow-hidden">
                  <p className="stat-value text-xl md:text-2xl font-bold text-foreground break-words">{selectedCity.projectedLivesSaved.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Projected Lives Saved/Year</p>
                </div>
                <div className="text-center overflow-hidden">
                  <p className="stat-value text-xl md:text-2xl font-bold text-primary break-words">{selectedCity.projectedCostSavings}</p>
                  <p className="text-xs text-muted-foreground">Projected Cost Savings/Year</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Want to bring KAVACH to <strong className="text-foreground">{selectedCity.name}</strong>?
              </p>
              <Link
                to="/request-demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
              >
                <Zap className="h-4 w-4" /> Request Pilot Program
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CitySelector;
