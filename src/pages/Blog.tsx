import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  { title: "India's Road Crisis: 474 Deaths Every Day", date: "Feb 2026", tag: "Crisis", excerpt: "172,890 road deaths in 2023 — the highest ever recorded. Understanding the scale of the emergency.", color: "text-destructive" },
  { title: "The Golden Hour: Why Every Minute Matters", date: "Jan 2026", tag: "Medical", excerpt: "For cardiac arrest patients, global survival to hospital discharge averages only 8.8%. Faster response is critical.", color: "text-accent" },
  { title: "How AI-CER Creates Green Corridors", date: "Jan 2026", tag: "Technology", excerpt: "Our AI predicts traffic patterns and dynamically adjusts signals to create clear paths for emergency vehicles.", color: "text-primary" },
  { title: "Chennai Simulation: 25-40% Faster Response", date: "Dec 2025", tag: "Data", excerpt: "Our Chennai urban traffic simulation projects significant reduction in emergency vehicle travel time.", color: "text-primary" },
  { title: "Why Ambulances Get Stuck in India", date: "Nov 2025", tag: "Research", excerpt: "CAG audits show Indian ambulances face significant delays. The 108 service target of 20 min is often missed.", color: "text-accent" },
  { title: "India's Traffic Cost: ₹5 Lakh Crore Annually", date: "Oct 2025", tag: "Economics", excerpt: "Studies estimate India loses approximately 3% of GDP to traffic congestion every year.", color: "text-destructive" },
];

const Blog = () => (
  <div className="min-h-screen pt-20 px-4 pb-20">
    <div className="mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Stories & Analysis</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl mb-4">BLOG</h1>
        <p className="text-muted-foreground">Research, data analysis, and stories from India's emergency response crisis.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card group cursor-pointer hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold ${post.color}`}>{post.tag}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {post.date}
              </span>
            </div>
            <h3 className="font-display text-sm font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">{post.excerpt}</p>
            <span className="text-xs text-primary font-semibold flex items-center gap-1">
              Read More <ArrowRight className="h-3 w-3" />
            </span>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
