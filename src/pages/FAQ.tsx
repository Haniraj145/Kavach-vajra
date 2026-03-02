import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { q: "What is KAVACH?", a: "KAVACH (powered by AI-CER) is an AI-powered emergency response system that creates dynamic green corridors for ambulances, defence, and VIP vehicles by intelligently controlling traffic signals in real-time." },
  { q: "How does the green corridor work?", a: "Our AI analyses traffic patterns, predicts optimal routes, and automatically adjusts traffic signals ahead of the emergency vehicle to create a clear path — reducing travel time by a projected 25-40%." },
  { q: "Is this actually deployed anywhere?", a: "KAVACH is currently in the simulation and pilot stage. We have a working simulation using Chennai traffic data. We are seeking government partnerships for real-world deployment." },
  { q: "What about the patent?", a: "A patent application has been filed with the Indian Patent Office covering the core AI-CER technology for dynamic green corridor creation." },
  { q: "How accurate are the city impact projections?", a: "The projections are based on internal simulation modelling and publicly available data. Actual results will vary based on city infrastructure, traffic density, and deployment scope. They are estimates for illustration." },
  { q: "Can this work with existing traffic infrastructure?", a: "KAVACH is designed to integrate with existing traffic signal systems. However, compatibility depends on the specific infrastructure in each city and requires a technical assessment." },
  { q: "How can I get involved?", a: "You can invest, donate, volunteer, or simply spread awareness. Visit our Join Us page or contact us at savelives@kavach.com." },
  { q: "Is this only for India?", a: "While designed in India, the technology is scalable globally. We have impact projections for international cities as well." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <HelpCircle className="h-10 w-10 text-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold md:text-5xl mb-4">FAQ</h1>
          <p className="text-muted-foreground">Frequently asked questions about KAVACH and AI-CER technology.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="gradient-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
