import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, DollarSign, Share2, CheckCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";

const JoinUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", org: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold md:text-5xl mb-4">LET'S SAVE LIVES TOGETHER</h1>
          <p className="text-lg text-muted-foreground">"The next life saved may be someone you love."</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {[
            { icon: DollarSign, title: "INVEST", desc: "Scale the solution nationwide", items: ["Partner in deploying across cities", "ROI through government contracts", "Social impact + financial returns"] },
            { icon: Heart, title: "DONATE", desc: "Support the mission", items: ["Support R&D and pilot programmes", "Help deploy in underserved cities", "Contact us to discuss partnership"] },
            { icon: Share2, title: "SPREAD", desc: "Be a voice for change", items: ["Share on social media", "Connect us with decision makers", "Join community discussions"] },
          ].map((card) => (
            <div key={card.title} className="stat-card text-center">
              <card.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold mb-1">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
              <ul className="text-xs text-muted-foreground space-y-1 text-left">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-1">
                    <span className="text-primary mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {submitted ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-muted-foreground">We've received your interest. Our team will reach out within 24-48 hours.</p>
          </motion.div>
        ) : (
          <div className="gradient-card rounded-2xl border border-border p-8">
            <h3 className="font-display text-xl font-bold mb-6 text-center">JOIN THE MOVEMENT</h3>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              {["name", "email", "phone", "city", "org"].map((key) => (
                <input
                  key={key}
                  type={key === "email" ? "email" : "text"}
                  required={["name", "email"].includes(key)}
                  placeholder={key === "org" ? "Organization (if applicable)" : key.charAt(0).toUpperCase() + key.slice(1) + (["name", "email"].includes(key) ? " *" : "")}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              ))}
              <textarea
                placeholder="Message / How you'd like to help"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary resize-none"
              />
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 glow-primary">
                <Send className="h-4 w-4" /> Submit Interest
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinUs;
