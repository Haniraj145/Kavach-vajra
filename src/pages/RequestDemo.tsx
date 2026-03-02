import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const RequestDemo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", org: "", role: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Request Received!</h2>
          <p className="text-muted-foreground">Our team will contact you within 24-48 hours.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Exclusive Access</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl mb-4">REQUEST DEMO</h1>
          <p className="text-muted-foreground">Experience our working simulation. Request exclusive demo access.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="gradient-card rounded-2xl border border-border p-8 space-y-4">
          {[
            { label: "Full Name", key: "name", type: "text" },
            { label: "Email", key: "email", type: "email" },
            { label: "Phone", key: "phone", type: "tel" },
            { label: "Organization", key: "org", type: "text" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm font-medium mb-1 block">{field.label} *</label>
              <input
                type={field.type}
                required
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium mb-1 block">Your Role *</label>
            <select
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">Select your role</option>
              <option>Government Official</option>
              <option>Defence / Military</option>
              <option>Investor</option>
              <option>Healthcare Provider</option>
              <option>Researcher/Academic</option>
              <option>Media/Press</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Why do you want to see the demo? *</label>
            <textarea
              required
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
          >
            <Send className="h-4 w-4" /> Request Demo Access
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestDemo;
