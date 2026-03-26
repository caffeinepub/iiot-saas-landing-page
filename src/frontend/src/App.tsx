import { useEffect, useRef } from "react";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.12 },
    );
    for (const el of document.querySelectorAll(".reveal")) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ─── Style helpers ───────────────────────────────────────────────────────────
function bgRed(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.background = "#CC0000";
}
function bgRedReset(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.background = "#FF0000";
}

// ─── Button component (styled as primary red) ───────────────────────────────────
function RedButton({
  children,
  onClick,
  style,
  dataOcid,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  dataOcid?: string;
}) {
  return (
    <button
      type="button"
      data-ocid={dataOcid}
      onClick={onClick}
      style={{
        background: "#FF0000",
        color: "#fff",
        padding: "14px 32px",
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 15,
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.15s",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "inherit",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#CC0000";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#FF0000";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div
      className="relative rounded-xl p-5 red-glow"
      style={{
        background: "#151A20",
        border: "1px solid #2A2F36",
        maxWidth: 480,
        width: "100%",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="pulse-dot inline-block w-2 h-2 rounded-full"
            style={{ background: "#FF0000" }}
          />
          <span className="text-xs font-semibold" style={{ color: "#A7B0BA" }}>
            LIVE DASHBOARD
          </span>
        </div>
        <span className="text-xs" style={{ color: "#6F7782" }}>
          Updated: 2s ago
        </span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Uptime", value: "99.2%", delta: "+0.3%", color: "#22c55e" },
          { label: "Alerts", value: "3", delta: "-2", color: "#FF0000" },
          {
            label: "Efficiency",
            value: "+18%",
            delta: "↑ Trend",
            color: "#22c55e",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg p-3"
            style={{ background: "#1A2028", border: "1px solid #2A2F36" }}
          >
            <div className="text-xs mb-1" style={{ color: "#6F7782" }}>
              {kpi.label}
            </div>
            <div className="text-lg font-bold" style={{ color: "#F2F4F7" }}>
              {kpi.value}
            </div>
            <div className="text-xs font-medium" style={{ color: kpi.color }}>
              {kpi.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Line chart */}
      <div
        className="rounded-lg p-3 mb-4"
        style={{ background: "#1A2028", border: "1px solid #2A2F36" }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold" style={{ color: "#A7B0BA" }}>
            Throughput (units/hr)
          </span>
          <span className="text-xs" style={{ color: "#FF0000" }}>
            ▲ 12.4%
          </span>
        </div>
        <svg
          viewBox="0 0 320 80"
          className="w-full"
          style={{ height: 80 }}
          aria-hidden="true"
        >
          {[20, 40, 60].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="320"
              y2={y}
              stroke="#2A2F36"
              strokeWidth="1"
            />
          ))}
          <path
            d="M0 70 L40 60 L80 55 L120 45 L160 40 L200 30 L240 25 L280 15 L320 10 L320 80 L0 80 Z"
            fill="rgba(255,0,0,0.1)"
          />
          <path
            className="draw-line"
            d="M0 70 L40 60 L80 55 L120 45 L160 40 L200 30 L240 25 L280 15 L320 10"
            fill="none"
            stroke="#FF0000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="320" cy="10" r="4" fill="#FF0000" />
        </svg>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Temperature", pct: 72, color: "#FF0000" },
          { label: "Pressure", pct: 48, color: "#3b82f6" },
        ].map((g) => (
          <div
            key={g.label}
            className="rounded-lg p-3"
            style={{ background: "#1A2028", border: "1px solid #2A2F36" }}
          >
            <div className="text-xs mb-2" style={{ color: "#6F7782" }}>
              {g.label}
            </div>
            <div
              className="w-full rounded-full h-2"
              style={{ background: "#2A2F36" }}
            >
              <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{ width: `${g.pct}%`, background: g.color }}
              />
            </div>
            <div
              className="text-xs mt-1 font-semibold"
              style={{ color: "#F2F4F7" }}
            >
              {g.pct}%
            </div>
          </div>
        ))}
      </div>

      <div
        className="absolute -inset-px rounded-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,0,0,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ─── Feature icons ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        <path d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
    title: "Real-time Monitoring",
    desc: "Live sensor data streams with sub-second latency. Visualise every machine state as it happens.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Predictive Maintenance",
    desc: "AI-driven failure prediction reduces unplanned downtime by up to 40% before issues occur.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Remote Asset Management",
    desc: "Control and configure any device globally from a single unified dashboard.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Edge Analytics",
    desc: "Process data at the source. Reduce bandwidth costs with intelligent on-device computation.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Seamless Integrations",
    desc: "Connect to 100+ industrial protocols — OPC-UA, MQTT, Modbus, REST APIs, and ERP systems.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="8" height="8" rx="1" />
        <rect x="14" y="2" width="8" height="8" rx="1" />
        <rect x="2" y="14" width="8" height="8" rx="1" />
        <rect x="14" y="14" width="8" height="8" rx="1" />
      </svg>
    ),
    title: "Scalable Infrastructure",
    desc: "Start with 10 devices, scale to millions. Cloud-native architecture grows with your operations.",
  },
];

const USE_CASES = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <path d="M2 20V10l10-8 10 8v10" />
        <path d="M6 20v-6h4v6" />
        <path d="M14 20v-4h4v4" />
      </svg>
    ),
    title: "Manufacturing",
    desc: "Unify your factory floor. Monitor OEE, reduce scrap, and streamline production workflows in real time.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Energy & Utilities",
    desc: "Optimise grid performance, detect anomalies in generation assets, and meet sustainability targets.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF0000"
        strokeWidth="2"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Logistics",
    desc: "Track fleet, warehouse assets, and cold-chain conditions with end-to-end supply chain visibility.",
  },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();
  const emailRef = useRef<HTMLInputElement>(null);

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "#0B0D10",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(11,13,16,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #2A2F36",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <img
            src="/assets/generated/nexaflow-logo-transparent.dim_400x120.png"
            alt="Nexaflow"
            style={{ height: 40, width: "auto" }}
          />

          <RedButton
            dataOcid="nav.primary_button"
            onClick={scrollToDemo}
            style={{ padding: "10px 22px", fontSize: 14 }}
          >
            Get Free Demo
          </RedButton>
        </div>
      </header>

      {/* ── HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "96px 24px 80px",
          background:
            "radial-gradient(ellipse 80% 60% at 60% 50%, #2A0A0A 0%, #0B0D10 70%)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
          className="reveal"
        >
          {/* Left copy */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,0,0,0.12)",
                border: "1px solid rgba(255,0,0,0.3)",
                borderRadius: 20,
                padding: "4px 14px",
                marginBottom: 24,
              }}
            >
              <span
                className="pulse-dot inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "#FF0000" }}
              />
              <span
                style={{
                  color: "#FF0000",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                INDUSTRIAL IOT PLATFORM
              </span>
            </div>

            <h1
              style={{
                color: "#F2F4F7",
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Connect. Monitor.
              <br />
              <span style={{ color: "#FF0000" }}>Optimize.</span>
              <br />
              Your Factory Floor.
            </h1>

            <p
              style={{
                color: "#A7B0BA",
                fontSize: 17,
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 460,
              }}
            >
              The enterprise IIoT platform that transforms raw machine data into
              actionable intelligence — in real time, at scale.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <RedButton dataOcid="hero.primary_button" onClick={scrollToDemo}>
                Get Free Demo
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </RedButton>

              <button
                type="button"
                data-ocid="hero.secondary_button"
                style={{
                  color: "#A7B0BA",
                  padding: "14px 32px",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 15,
                  background: "transparent",
                  border: "1px solid #2A2F36",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FF0000";
                  e.currentTarget.style.color = "#F2F4F7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2A2F36";
                  e.currentTarget.style.color = "#A7B0BA";
                }}
              >
                Watch Demo
              </button>
            </div>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
              }}
            >
              {[
                { num: "500+", label: "Manufacturers" },
                { num: "40%", label: "Downtime Reduction" },
                { num: "10M+", label: "Devices Connected" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{ color: "#FF0000", fontSize: 22, fontWeight: 800 }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      color: "#6F7782",
                      fontSize: 12,
                      fontWeight: 500,
                      marginTop: 2,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: dashboard */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DashboardMockup />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-two-col { grid-template-columns: 1fr !important; }
            .hero-two-col > div:last-child { display: none !important; }
          }
        `}</style>
      </section>

      {/* ── TRUST BAR */}
      <section
        style={{
          borderTop: "1px solid #2A2F36",
          borderBottom: "1px solid #2A2F36",
          padding: "36px 24px",
        }}
      >
        <div
          style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}
          className="reveal"
        >
          <p
            style={{
              color: "#6F7782",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Trusted by 500+ manufacturers worldwide
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 48,
              flexWrap: "wrap",
            }}
          >
            {["SIEMENS", "BOSCH", "GE", "HONEYWELL", "ABB"].map((brand) => (
              <span
                key={brand}
                style={{
                  color: "#6F7782",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  opacity: 0.7,
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", marginBottom: 56 }}
            className="reveal"
          >
            <span
              style={{
                color: "#FF0000",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Platform Capabilities
            </span>
            <h2
              style={{
                color: "#F2F4F7",
                fontSize: "clamp(26px,3.5vw,40px)",
                fontWeight: 800,
                marginTop: 12,
                letterSpacing: "-0.5px",
              }}
            >
              Everything you need to run
              <br />
              smarter operations
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                data-ocid={`features.item.${i + 1}`}
                className="reveal"
                style={{
                  transitionDelay: `${(i % 3) * 0.1}s`,
                  background: "#151A20",
                  border: "1px solid #2A2F36",
                  borderRadius: 12,
                  padding: 28,
                  transition: "border-color 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,0,0,0.4)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2A2F36";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(255,0,0,0.1)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    color: "#F2F4F7",
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: "#A7B0BA", fontSize: 14, lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY USE CASES */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", marginBottom: 48 }}
            className="reveal"
          >
            <span
              style={{
                color: "#FF0000",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Industry Solutions
            </span>
            <h2
              style={{
                color: "#F2F4F7",
                fontSize: "clamp(26px,3.5vw,40px)",
                fontWeight: 800,
                marginTop: 12,
                letterSpacing: "-0.5px",
              }}
            >
              Built for critical industries
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {USE_CASES.map((uc, i) => (
              <div
                key={uc.title}
                data-ocid={`usecases.item.${i + 1}`}
                className="reveal"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  background:
                    "linear-gradient(135deg, #1A2028 0%, #151A20 100%)",
                  border: "1px solid #2A2F36",
                  borderRadius: 12,
                  padding: 32,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: "rgba(255,0,0,0.1)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {uc.icon}
                </div>
                <h3
                  style={{
                    color: "#F2F4F7",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {uc.title}
                </h3>
                <p
                  style={{
                    color: "#A7B0BA",
                    fontSize: 14,
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  {uc.desc}
                </p>
                <button
                  type="button"
                  data-ocid={`usecases.link.${i + 1}`}
                  style={{
                    color: "#FF0000",
                    fontSize: 13,
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "gap 0.2s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = "10px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = "6px";
                  }}
                >
                  Learn More
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="14"
                    height="14"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS */}
      <section
        style={{
          padding: "80px 24px",
          background: "#0D1014",
          borderTop: "1px solid #2A2F36",
          borderBottom: "1px solid #2A2F36",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", marginBottom: 56 }}
            className="reveal"
          >
            <span
              style={{
                color: "#FF0000",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              How It Works
            </span>
            <h2
              style={{
                color: "#F2F4F7",
                fontSize: "clamp(26px,3.5vw,40px)",
                fontWeight: 800,
                marginTop: 12,
                letterSpacing: "-0.5px",
              }}
            >
              From device to decision in minutes
            </h2>
          </div>

          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 28,
                left: "calc(16.67% + 20px)",
                right: "calc(16.67% + 20px)",
                height: 2,
                background: "linear-gradient(90deg, #FF0000, #2A2F36)",
                zIndex: 0,
              }}
            />

            {[
              {
                step: "01",
                title: "Connect Devices",
                desc: "Plug in our universal gateway or deploy our SDK. Supports 100+ industrial protocols out of the box.",
              },
              {
                step: "02",
                title: "Collect Data",
                desc: "Aggregate telemetry from every sensor and machine into a unified, normalised data lake.",
              },
              {
                step: "03",
                title: "Act on Insights",
                desc: "Trigger automations, alerts, and workflows. Let AI surface the next best action for your operators.",
              },
            ].map((s, i) => (
              <div
                key={s.step}
                data-ocid={`howitworks.item.${i + 1}`}
                style={{
                  padding: "0 24px",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: i === 0 ? "#FF0000" : "#1A2028",
                    border: `2px solid ${i === 0 ? "#FF0000" : "#2A2F36"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    color: "#F2F4F7",
                    fontWeight: 800,
                    fontSize: 16,
                  }}
                >
                  {s.step}
                </div>
                <h3
                  style={{
                    color: "#F2F4F7",
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: "#A7B0BA", fontSize: 14, lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA */}
      <section
        id="demo"
        data-ocid="cta.section"
        style={{
          padding: "80px 24px",
          background:
            "linear-gradient(135deg, #1a0000 0%, #2A0A0A 40%, #0B0D10 100%)",
          borderBottom: "1px solid #2A2F36",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(255,0,0,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
          className="reveal"
        >
          <h2
            style={{
              color: "#F2F4F7",
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 900,
              letterSpacing: "-1px",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Start your IoT journey today
          </h2>
          <p style={{ color: "#A7B0BA", fontSize: 16, marginBottom: 36 }}>
            Join 500+ manufacturers already transforming their operations with
            NexaFlow.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              gap: 12,
              maxWidth: 520,
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your work email"
              data-ocid="cta.input"
              style={{
                flex: 1,
                minWidth: 240,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid #2A2F36",
                borderRadius: 8,
                padding: "12px 16px",
                color: "#F2F4F7",
                fontSize: 15,
                outline: "none",
              }}
            />
            <button
              type="submit"
              data-ocid="cta.submit_button"
              style={{
                background: "#FF0000",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
              onMouseEnter={bgRed}
              onMouseLeave={bgRedReset}
            >
              Request Demo
            </button>
          </form>
          <p style={{ color: "#6F7782", fontSize: 12, marginTop: 16 }}>
            No credit card required · Setup in under 10 minutes
          </p>
        </div>
      </section>

      {/* ── FOOTER */}
      <footer style={{ padding: "28px 24px", borderTop: "1px solid #2A2F36" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <button
            type="button"
            style={{
              color: "#6F7782",
              fontSize: 13,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#A7B0BA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6F7782";
            }}
          >
            Privacy Policy
          </button>
          <span style={{ color: "#2A2F36" }}>|</span>
          <button
            type="button"
            style={{
              color: "#6F7782",
              fontSize: 13,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#A7B0BA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6F7782";
            }}
          >
            Terms of Service
          </button>
          <span style={{ color: "#2A2F36" }}>|</span>
          <span style={{ color: "#6F7782", fontSize: 13 }}>
            © {new Date().getFullYear()} NexaFlow IIoT. All rights reserved.
          </span>
          <span style={{ color: "#2A2F36" }}>|</span>
          <span style={{ color: "#6F7782", fontSize: 13 }}>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              style={{ color: "#6F7782", textDecoration: "underline" }}
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .reveal[style] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
