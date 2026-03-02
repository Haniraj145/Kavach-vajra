import CitySelector from "@/components/CitySelector";
import HospitalFinder from "@/components/HospitalFinder";
import { motion } from "framer-motion";

const CityImpact = () => (
  <div className="min-h-screen pt-20 pb-20">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 px-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">City-Level Analysis</p>
      <h1 className="font-display text-4xl font-bold md:text-5xl mb-4">CITY IMPACT</h1>
      <p className="text-muted-foreground max-w-xl mx-auto">
        Explore emergency response data for cities worldwide and see the projected impact of KAVACH technology.
      </p>
    </motion.div>
    <CitySelector />
    <HospitalFinder />
  </div>
);

export default CityImpact;
