import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, DollarSign, Share2, CheckCircle, Send } from "lucide-react";

const TELEGRAM_BOT_TOKEN = "8674012746:AAFdrGAZQiTkl1YDxFgLNCPQRTu2aqGRx_A";
const TELEGRAM_CHAT_ID = "2131042994";

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", org: "", message: "" });

  // Email validation
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Phone validation (10 digits)
  const isValidPhone = (phone: string) =>
    /^\d{10}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim inputs
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const city = form.city.trim();
    const org = form.org.trim();
    const messageText = form.message.trim();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const message = `
📩 *New Feedback Received* 📩
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*City:* ${city}
*Organization:* ${org}
*Suggestions:* ${messageText}
`;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", city: "", org: "", message: "" });
    } catch (error) {
      console.error("Telegram message failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold md:text-5xl mb-4">FEEDBACK</h1>
          <p className="text-lg text-muted-foreground">"We value your suggestions to improve."</p>
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
            <p className="text-muted-foreground">We've received your feedback. Our team will review it shortly.</p>
          </motion.div>
        ) : (
          <div className="gradient-card rounded-2xl border border-border p-8">
            <h3 className="font-display text-xl font-bold mb-6 text-center">SEND US YOUR FEEDBACK</h3>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              {["name", "email", "phone", "city", "org"].map((key) => (
                <input
                  key={key}
                  type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                  required={["name", "email", "phone"].includes(key)}
                  maxLength={key === "phone" ? 10 : undefined}
                  placeholder={key === "org" ? "Organization (if applicable)" : key.charAt(0).toUpperCase() + key.slice(1) + (["name", "email", "phone"].includes(key) ? " *" : "")}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              ))}
              <textarea
                placeholder="Your suggestions / How we can improve"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary resize-none"
              />
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 glow-primary">
                <Send className="h-4 w-4" /> Submit Feedback
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;