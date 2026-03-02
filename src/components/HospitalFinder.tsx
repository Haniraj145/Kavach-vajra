import { useState, useEffect, useCallback } from "react";
import { MapPin, Navigation, Hospital, Clock, AlertTriangle, Loader2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HospitalResult {
  name: string;
  vicinity: string;
  lat: number;
  lng: number;
  distance: string;
}

// Simulate nearby hospitals based on coords
const getSimulatedHospitals = (lat: number, lng: number): HospitalResult[] => {
  const hospitals = [
    { name: "City General Hospital", offset: [0.008, 0.005] },
    { name: "Apollo Emergency Center", offset: [-0.012, 0.008] },
    { name: "Fortis Healthcare", offset: [0.015, -0.01] },
    { name: "Max Super Speciality Hospital", offset: [-0.005, -0.015] },
    { name: "Medanta - The Medicity", offset: [0.02, 0.012] },
    { name: "AIIMS Trauma Centre", offset: [-0.018, 0.003] },
    { name: "Sir Ganga Ram Hospital", offset: [0.007, -0.02] },
    { name: "Safdarjung Hospital", offset: [-0.01, 0.018] },
  ];

  return hospitals.map((h) => {
    const hLat = lat + h.offset[0];
    const hLng = lng + h.offset[1];
    const dist = Math.sqrt(Math.pow((hLat - lat) * 111, 2) + Math.pow((hLng - lng) * 111 * Math.cos(lat * Math.PI / 180), 2));
    return {
      name: h.name,
      vicinity: `${dist.toFixed(1)} km away`,
      lat: hLat,
      lng: hLng,
      distance: `${dist.toFixed(1)} km`,
    };
  }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
};

const HospitalFinder = () => {
  const [step, setStep] = useState<"initial" | "locating" | "hospitals" | "map">("initial");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [hospitals, setHospitals] = useState<HospitalResult[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<HospitalResult | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const confirmLocation = useCallback(() => {
    setStep("locating");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(loc);
        const simulatedHospitals = getSimulatedHospitals(loc.lat, loc.lng);
        setHospitals(simulatedHospitals);
        setStep("hospitals");
      },
      (err) => {
        setError("Location access denied. Please enable location services and try again.");
        setStep("initial");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const selectHospital = (hospital: HospitalResult) => {
    setSelectedHospital(hospital);
    const dist = parseFloat(hospital.distance);
    // Simulate response time: ~3 min per km in traffic
    const time = Math.round(dist * 3 + Math.random() * 10 + 15);
    setResponseTime(time);
    setStep("map");
  };

  const getMapUrl = () => {
    if (!userLocation || !selectedHospital) return "";
    return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedHospital.lat},${selectedHospital.lng}&mode=driving`;
  };

  const getStaticMapUrl = () => {
    if (!userLocation || !selectedHospital) return "";
    return `https://www.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=${selectedHospital.lat},${selectedHospital.lng}&output=embed`;
  };

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Experience the Difference</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Emergency Response Simulator</h2>
        </div>

        <div className="gradient-card rounded-2xl border border-border overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Confirm Location */}
            {step === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 md:p-12 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Hospital className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-display text-xl font-bold">KAVACH</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">powered by VAJRA</p>

                <h3 className="font-display text-2xl font-bold mb-4 md:text-3xl">
                  WHAT IF YOU NEEDED AN<br />AMBULANCE RIGHT NOW?
                </h3>
                <p className="text-muted-foreground mb-2">Every second counts in an emergency.</p>
                <p className="text-muted-foreground mb-8">Let's see how long it would take to reach a hospital from your location.</p>

                <button
                  onClick={confirmLocation}
                  className="inline-flex items-center gap-2 rounded-full bg-destructive px-8 py-4 text-base font-semibold text-destructive-foreground transition-all hover:opacity-90 glow-accent"
                >
                  <MapPin className="h-5 w-5" /> Confirm My Location
                </button>

                <p className="mt-4 text-xs text-muted-foreground">
                  We'll use your location to calculate emergency response time
                </p>
                <p className="mt-2 text-xs text-accent flex items-center justify-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> This is a simulation for demonstration purposes only
                </p>

                {error && (
                  <p className="mt-4 text-sm text-destructive">{error}</p>
                )}
              </motion.div>
            )}

            {/* Step 2: Locating */}
            {step === "locating" && (
              <motion.div
                key="locating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 text-center"
              >
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold mb-2">Locating you...</h3>
                <p className="text-muted-foreground">Getting your GPS coordinates</p>
              </motion.div>
            )}

            {/* Step 3: Hospital List */}
            {step === "hospitals" && (
              <motion.div
                key="hospitals"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 md:p-8"
              >
                <h3 className="font-display text-xl font-bold mb-2 text-center">Nearest Emergency Hospitals</h3>
                <p className="text-center text-muted-foreground text-sm mb-6">Select the hospital nearest to you</p>

                <div className="space-y-2">
                  {hospitals.map((hospital, i) => (
                    <button
                      key={i}
                      onClick={() => selectHospital(hospital)}
                      className="w-full flex items-center justify-between rounded-xl border border-border bg-secondary/50 p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <Hospital className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{hospital.name}</p>
                          <p className="text-xs text-muted-foreground">{hospital.vicinity}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Map & Response Time */}
            {step === "map" && selectedHospital && (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 md:p-8"
              >
                <h3 className="font-display text-xl font-bold mb-4 text-center">Current Emergency Response Time</h3>

                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center mb-6">
                  <p className="stat-value text-6xl font-bold text-destructive">{responseTime}</p>
                  <p className="text-lg text-muted-foreground mt-1">Minutes</p>
                </div>

                {/* Google Maps iframe */}
                <div className="rounded-xl overflow-hidden border border-border mb-6" style={{ height: 350 }}>
                  <iframe
                    title="Route to Hospital"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={getStaticMapUrl()}
                    allowFullScreen
                  />
                </div>

                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Route to <strong className="text-foreground">{selectedHospital.name}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">Distance: {selectedHospital.distance}</p>
                </div>

                {/* With KAVACH */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center mb-6">
                  <h4 className="font-display text-sm font-bold text-primary mb-3">With KAVACH Green Corridor System</h4>
                  <p className="stat-value text-5xl font-bold text-primary">
                    {responseTime ? Math.round(responseTime * 0.6) : "--"}
                  </p>
                  <p className="text-lg text-muted-foreground mt-1">Minutes</p>
                  <p className="text-sm text-primary font-semibold mt-2">
                    {responseTime ? responseTime - Math.round(responseTime * 0.6) : "--"} minutes saved · ~40% faster
                  </p>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => { setStep("initial"); setSelectedHospital(null); setResponseTime(null); }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    🔄 Run Again
                  </button>
                  <a
                    href={`https://www.google.com/maps/dir/${userLocation?.lat},${userLocation?.lng}/${selectedHospital.lat},${selectedHospital.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                  >
                    <Navigation className="h-4 w-4" /> Open in Maps
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HospitalFinder;
