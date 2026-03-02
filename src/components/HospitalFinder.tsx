import { useState, useCallback } from "react";
import { MapPin, Navigation, Hospital, AlertTriangle, Loader2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API_KEY;

interface HospitalResult {
  name: string;
  address: string;
  lat: number;
  lng: number;
  distKm: number;
}

// ─── TomTom Search API — Nearby Search (category 7321 = Hospital/Polyclinic) ──
const fetchNearbyHospitals = async (lat: number, lng: number): Promise<HospitalResult[]> => {
  const url = `https://api.tomtom.com/search/2/nearbySearch/.json?key=${TOMTOM_KEY}&lat=${lat}&lon=${lng}&radius=4000&categorySet=7321&limit=50`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Hospital search failed");
  const data = await res.json();

  const results: HospitalResult[] = (data.results || []).map((r: any) => {
    const pos = r.position;
    const dist = r.dist; // distance in meters from TomTom
    return {
      name: r.poi?.name || "Hospital",
      address: r.address?.freeformAddress || r.address?.streetName || "Nearby",
      lat: pos.lat,
      lng: pos.lon,
      distKm: +(dist / 1000).toFixed(1),
    };
  });

  // Sort ascending by distance (nearest first: 0 km → 4 km)
  results.sort((a, b) => a.distKm - b.distKm);

  return results;
};

// ─── TomTom Routing API — get travel time & distance ────────────────────────
interface RouteInfo {
  travelTimeMin: number;
  distanceKm: number;
}

const fetchRouteInfo = async (
  startLat: number, startLng: number,
  endLat: number, endLng: number
): Promise<RouteInfo> => {
  const url = `https://api.tomtom.com/routing/1/calculateRoute/${startLat},${startLng}:${endLat},${endLng}/json?key=${TOMTOM_KEY}&travelMode=car&traffic=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Route calculation failed");
  const data = await res.json();

  const summary = data.routes[0].summary;
  return {
    travelTimeMin: Math.round(summary.travelTimeInSeconds / 60),
    distanceKm: +(summary.lengthInMeters / 1000).toFixed(1),
  };
};

// ─── Google Maps iframe URL ─────────────────────────────────────────────────
const getGoogleMapsIframeUrl = (
  userLat: number, userLng: number,
  hospLat: number, hospLng: number
): string => {
  return `https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d50000!2d${userLng}!3d${userLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s!2s${userLat},${userLng}!3m2!1d${userLat}!2d${userLng}!4m5!1s!2s${hospLat},${hospLng}!3m2!1d${hospLat}!2d${hospLng}!5e0!3m2!1sen!2sin`;
};

// ─── Component ──────────────────────────────────────────────────────────────
const HospitalFinder = () => {
  const [step, setStep] = useState<"initial" | "locating" | "hospitals" | "map">("initial");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [hospitals, setHospitals] = useState<HospitalResult[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<HospitalResult | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  // ── Step 1 → 2 → 3: Get location → fetch hospitals
  const confirmLocation = useCallback(() => {
    setStep("locating");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(loc);
        try {
          const results = await fetchNearbyHospitals(loc.lat, loc.lng);
          if (results.length === 0) {
            setError("No hospitals found within 4 km. Try again from a different area.");
            setStep("initial");
            return;
          }
          setHospitals(results);
          setStep("hospitals");
        } catch {
          setError("Could not fetch nearby hospitals. Please try again.");
          setStep("initial");
        }
      },
      () => {
        setError("Location access denied. Please enable location services and try again.");
        setStep("initial");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // ── Step 3 → 4: Select hospital → fetch route info
  const selectHospital = async (hospital: HospitalResult) => {
    if (!userLocation) return;
    setSelectedHospital(hospital);
    setRouteLoading(true);
    setRouteInfo(null);
    setStep("map");

    try {
      const info = await fetchRouteInfo(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng);
      setRouteInfo({
        ...info,
        travelTimeMin: (info.travelTimeMin * 2) + 5,
      });
    } catch {
      // Fallback estimate if routing fails
      const fallbackTime = Math.round(hospital.distKm * 3 + 10);
      setRouteInfo({
        travelTimeMin: (fallbackTime * 2) + 5,
        distanceKm: hospital.distKm,
      });
    } finally {
      setRouteLoading(false);
    }
  };

  // ── Reset: go back to initial state cleanly ──
  const handleReset = () => {
    setStep("initial");
    setSelectedHospital(null);
    setRouteInfo(null);
    setRouteLoading(false);
    // Keep userLocation and hospitals so re-searching is fast
  };

  // ── Go back to hospital list (to pick a different one) ──
  const handlePickAnother = () => {
    setSelectedHospital(null);
    setRouteInfo(null);
    setRouteLoading(false);
    setStep("hospitals");
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
            {/* ═══ Step 1: Confirm Location ═══ */}
            {step === "initial" && (
              <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 md:p-12 text-center">
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

                <p className="mt-4 text-xs text-muted-foreground">We'll use your location to find real nearby hospitals (within 4 km)</p>
                <p className="mt-2 text-xs text-accent flex items-center justify-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Response times are estimates for demonstration purposes
                </p>

                {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
              </motion.div>
            )}

            {/* ═══ Step 2: Locating ═══ */}
            {step === "locating" && (
              <motion.div key="locating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold mb-2">Locating you...</h3>
                <p className="text-muted-foreground">Getting your GPS coordinates & searching nearby hospitals</p>
              </motion.div>
            )}

            {/* ═══ Step 3: Hospital List (sorted nearest → farthest) ═══ */}
            {step === "hospitals" && (
              <motion.div key="hospitals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-8">
                <h3 className="font-display text-xl font-bold mb-2 text-center">Nearest Emergency Hospitals</h3>
                <p className="text-center text-muted-foreground text-sm mb-6">
                  {hospitals.length} hospitals found within 4 km · Sorted nearest first
                </p>

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
                          <p className="text-xs text-muted-foreground">{hospital.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary">{hospital.distKm} km</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ Step 4: Google Maps iframe + Response Time ═══ */}
            {step === "map" && selectedHospital && userLocation && (
              <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-8">
                <h3 className="font-display text-xl font-bold mb-4 text-center">Current Emergency Response Time</h3>

                {/* Response time card */}
                {routeLoading ? (
                  <div className="rounded-xl border border-border bg-secondary/30 p-6 text-center mb-6">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Calculating route...</p>
                  </div>
                ) : routeInfo && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center mb-6">
                    <p className="stat-value text-6xl font-bold text-destructive">{routeInfo.travelTimeMin}</p>
                    <p className="text-lg text-muted-foreground mt-1">Minutes</p>
                    <p className="text-xs text-muted-foreground mt-1">Distance: {routeInfo.distanceKm} km (with live traffic)</p>
                  </div>
                )}

                {/* Google Maps iframe — Point A (user) to Point B (hospital) */}
                <div className="rounded-xl overflow-hidden border border-border mb-6" style={{ height: 350 }}>
                  <iframe
                    title="Route to Hospital"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=${selectedHospital.lat},${selectedHospital.lng}&dirflg=d&output=embed`}
                  />
                </div>

                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Route to <strong className="text-foreground">{selectedHospital.name}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">{selectedHospital.address}</p>
                </div>

                {/* KAVACH projected time */}
                {routeInfo && !routeLoading && (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center mb-6">
                    <h4 className="font-display text-sm font-bold text-primary mb-3">With KAVACH Green Corridor System</h4>
                    <p className="stat-value text-5xl font-bold text-primary">
                      {Math.round(routeInfo.travelTimeMin * 0.6)}
                    </p>
                    <p className="text-lg text-muted-foreground mt-1">Minutes</p>
                    <p className="text-sm text-primary font-semibold mt-2">
                      {routeInfo.travelTimeMin - Math.round(routeInfo.travelTimeMin * 0.6)} minutes saved · ~40% faster
                    </p>
                  </div>
                )}

                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={handlePickAnother}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    ← Pick Another Hospital
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    🔄 Run Again
                  </button>
                  <a
                    href={`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${selectedHospital.lat},${selectedHospital.lng}`}
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