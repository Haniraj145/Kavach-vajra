import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">KAVACH</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered emergency response system for priority vehicle green corridors.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              ["The Crisis", "/crisis"],
              ["Our Solution", "/solution"],
              ["City Impact", "/city-impact"],
              ["Blog", "/blog"],
            ].map(([label, path]) => (
              <Link key={path} to={path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Get Involved</h4>
          <div className="flex flex-col gap-2">
            {[
              ["Request Demo", "/request-demo"],
              ["Join Us", "/join-us"],
              ["Govt & Defence", "/govt-defence"],
              ["FAQ", "/faq"],
            ].map(([label, path]) => (
              <Link key={path} to={path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> savelives@kavach.com</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> India</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 KAVACH-VAJRA. Made in India, for the world. Patent Filed.
      </div>
    </div>
  </footer>
);

export default Footer;
