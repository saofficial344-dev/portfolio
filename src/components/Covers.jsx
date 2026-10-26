const c = (n, a = 1) => `rgb(var(--${n}) / ${a})`;
const f = (n, a = 1) => ({ fill: c(n, a) });
const fs = (fill, fa, stroke, sa, w = 3) => ({
  fill: c(fill, fa), stroke: c(stroke, sa), strokeWidth: w, strokeLinecap: "round", strokeLinejoin: "round",
});
const ln = (n, a = 1, w = 3) => ({
  fill: "none", stroke: c(n, a), strokeWidth: w, strokeLinecap: "round", strokeLinejoin: "round",
});

function Frame({ id, title, tag, children }) {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label={`${title} cover`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "rgb(var(--primary))", stopOpacity: 0.16 }} />
          <stop offset="0.55" style={{ stopColor: "rgb(var(--surface))", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "rgb(var(--secondary))", stopOpacity: 0.16 }} />
        </linearGradient>
        <pattern id={`${id}-dots`} width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" style={f("fg", 0.14)} />
        </pattern>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="38" />
        </filter>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      <rect width="800" height="600" fill={`url(#${id}-dots)`} />
      <circle cx="650" cy="120" r="110" style={f("primary", 0.22)} filter={`url(#${id}-blur)`} />
      <circle cx="110" cy="470" r="100" style={f("secondary", 0.2)} filter={`url(#${id}-blur)`} />
      {children}
      <rect x="44" y="36" rx="16" width={tag.length * 9 + 34} height="32" style={f("fg", 0.08)} />
      <text x="61" y="58" style={{ fontFamily: "Figtree, system-ui, sans-serif", fontWeight: 700, fontSize: 15, fill: c("fg") }}>{tag}</text>
      <text x="44" y="556" style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800, fontSize: 42, fill: c("fg") }}>{title}</text>
    </svg>
  );
}

/* ---------- websites ---------- */
function LaptopHub() {
  return (
    <Frame id="lh" title="Laptop Hub" tag="Full-stack web app">
      <rect x="205" y="95" width="390" height="250" rx="16" style={fs("bg", 1, "fg", 0.55)} />
      <rect x="205" y="95" width="390" height="34" rx="16" style={f("fg", 0.07)} />
      <circle cx="228" cy="112" r="5" style={f("secondary")} />
      <circle cx="246" cy="112" r="5" style={f("fg", 0.25)} />
      <circle cx="264" cy="112" r="5" style={f("fg", 0.25)} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={228 + i * 118} y="150" width="104" height="82" rx="10" style={f("primary", i === 1 ? 0.9 : 0.25)} />
          <rect x={228 + i * 118} y="244" width="70" height="8" rx="4" style={f("fg", 0.35)} />
          <rect x={228 + i * 118} y="262" width="40" height="8" rx="4" style={f("primary", 0.8)} />
        </g>
      ))}
      <rect x="228" y="292" width="344" height="30" rx="15" style={f("fg", 0.07)} />
      <path d="M165 352 H635 L612 375 Q608 380 600 380 H200 Q192 380 188 375 Z" style={fs("fg", 0.3, "fg", 0.55)} />
      <rect x="355" y="352" width="90" height="8" rx="4" style={f("bg", 0.8)} />
      <g transform="translate(560 150) rotate(8)">
        <rect width="150" height="54" rx="14" style={f("secondary")} />
        <text x="18" y="33" style={{ fontFamily: "Figtree, sans-serif", fontWeight: 700, fontSize: 17, fill: c("bg") }}>Live on Vercel</text>
      </g>
      <g transform="translate(78 270) rotate(-7)">
        <rect width="132" height="54" rx="14" style={f("primary")} />
        <text x="18" y="33" style={{ fontFamily: "Figtree, sans-serif", fontWeight: 700, fontSize: 17, fill: c("bg") }}>Neon DB</text>
      </g>
    </Frame>
  );
}

function Warsi() {
  return (
    <Frame id="wc" title="Warsi Computers" tag="E-commerce store">
      <rect x="170" y="160" width="460" height="230" rx="10" style={fs("bg", 1, "fg", 0.55)} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${170 + i * 57.5} 160 h57.5 v46 q-28.75 22 -57.5 0 z`} style={f(i % 2 ? "bg" : "secondary", i % 2 ? 1 : 0.95)} />
      ))}
      <path d="M170 160 H630" style={ln("fg", 0.55, 3)} />
      <rect x="196" y="238" width="250" height="132" rx="10" style={fs("primary", 0.12, "fg", 0.4, 2)} />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${214 + i * 118} 262)`}>
          <rect width="96" height="62" rx="6" style={fs("bg", 1, "fg", 0.5, 2.5)} />
          <rect x="8" y="8" width="80" height="40" rx="3" style={f("primary", 0.5)} />
          <path d="M-8 74 H104 L98 82 H-2 Z" style={f("fg", 0.45)} />
        </g>
      ))}
      <rect x="474" y="238" width="124" height="152" rx="8" style={fs("primary", 0.18, "fg", 0.4, 2)} />
      <circle cx="580" cy="320" r="6" style={f("secondary")} />
      <g transform="translate(560 120)">
        <circle r="38" style={f("primary")} />
        <path d="M-17 -12 H-10 L-4 10 H12 L17 -6 H-7" style={{ ...ln("bg", 1, 4.5) }} />
        <circle cx="-2" cy="19" r="3.5" style={f("bg")} />
        <circle cx="11" cy="19" r="3.5" style={f("bg")} />
      </g>
      <g transform="translate(120 130) rotate(-8)">
        <rect width="118" height="46" rx="23" style={f("secondary")} />
        <text x="22" y="30" style={{ fontFamily: "Figtree, sans-serif", fontWeight: 700, fontSize: 17, fill: c("bg") }}>Open now</text>
      </g>
    </Frame>
  );
}

function Amdhouse() {
  return (
    <Frame id="am" title="AMDHOUSE" tag="Brand and store identity">
      <rect x="290" y="82" width="220" height="330" rx="18" style={fs("bg", 1, "fg", 0.6)} />
      <rect x="306" y="98" width="188" height="298" rx="10" style={{ fill: "rgb(15 18 30)" }} />
      <rect x="306" y="98" width="6" height="298" style={f("primary")} />
      <rect x="306" y="98" width="188" height="6" style={f("secondary")} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${352 + i * 0} ${150 + i * 76})`}>
          <circle r="30" style={{ fill: "none", stroke: "rgb(255 255 255 / 0.85)", strokeWidth: 4 }} />
          <circle r="5" style={f("secondary")} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <path key={a} d="M0 0 L0 -23" transform={`rotate(${a})`} style={ln("secondary", 0.9, 5)} />
          ))}
        </g>
      ))}
      <rect x="404" y="124" width="74" height="250" rx="8" style={{ fill: "rgb(255 255 255 / 0.07)" }} />
      <g transform="translate(150 150) rotate(-10)">
        <rect width="124" height="164" rx="14" style={fs("bg", 1, "fg", 0.45, 2.5)} />
        <rect x="12" y="14" width="100" height="62" rx="8" style={f("primary", 0.7)} />
        <rect x="12" y="92" width="70" height="9" rx="4" style={f("fg", 0.5)} />
        <rect x="12" y="110" width="46" height="9" rx="4" style={f("fg", 0.3)} />
        <rect x="12" y="130" width="60" height="20" rx="10" style={f("secondary")} />
      </g>
      <g transform="translate(548 190) rotate(9)">
        <rect width="124" height="164" rx="14" style={fs("bg", 1, "fg", 0.45, 2.5)} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="12" y={18 + i * 26} width="46" height="8" rx="4" style={f("fg", 0.45)} />
            <rect x="72" y={18 + i * 26} width="38" height="8" rx="4" style={f("primary", 0.7)} />
          </g>
        ))}
        <rect x="12" y="128" width="100" height="22" rx="11" style={f("primary")} />
      </g>
    </Frame>
  );
}

/* ---------- business software ---------- */
function CashCarry() {
  return (
    <Frame id="cc" title="Cash and Carry POS" tag="Billing and stock">
      <rect x="150" y="130" width="330" height="240" rx="18" style={fs("bg", 1, "fg", 0.55)} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="172" y={156 + i * 48} width="34" height="34" rx="8" style={f("primary", 0.3)} />
          <rect x="220" y={162 + i * 48} width="140" height="9" rx="4" style={f("fg", 0.45)} />
          <rect x="220" y={178 + i * 48} width="80" height="8" rx="4" style={f("fg", 0.22)} />
          <rect x="400" y={166 + i * 48} width="52" height="10" rx="5" style={f("primary", 0.75)} />
        </g>
      ))}
      <path d="M150 370 H480 L500 395 H130 Z" style={fs("fg", 0.28, "fg", 0.5, 2.5)} />
      <g transform="translate(535 150) rotate(5)">
        <path d="M0 0 H130 V240 l-13 -12 l-13 12 l-13 -12 l-13 12 l-13 -12 l-13 12 l-13 -12 l-13 12 l-14 -12 Z" style={fs("bg", 1, "fg", 0.5, 2.5)} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="16" y={26 + i * 30} width="58" height="8" rx="4" style={f("fg", 0.4)} />
            <rect x="88" y={26 + i * 30} width="28" height="8" rx="4" style={f("fg", 0.3)} />
          </g>
        ))}
        <rect x="16" y="188" width="100" height="22" rx="11" style={f("primary")} />
      </g>
      <g transform="translate(86 392)">
        <rect width="70" height="54" rx="6" style={fs("secondary", 0.75, "fg", 0.5, 2.5)} />
        <path d="M0 18 H70 M35 0 V18" style={ln("fg", 0.5, 2.5)} />
      </g>
    </Frame>
  );
}

function MobileShop() {
  const phone = (x, y, r, s, tint) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <rect width="160" height="300" rx="26" style={fs("bg", 1, "fg", 0.6, 4)} />
      <rect x="10" y="12" width="140" height="276" rx="18" style={f("primary", tint)} />
      <rect x="62" y="20" width="36" height="8" rx="4" style={f("fg", 0.55)} />
      <rect x="26" y="60" width="108" height="86" rx="12" style={f("bg", 0.85)} />
      <rect x="26" y="162" width="76" height="10" rx="5" style={f("fg", 0.55)} />
      <rect x="26" y="182" width="50" height="10" rx="5" style={f("fg", 0.3)} />
      <rect x="26" y="226" width="108" height="30" rx="15" style={f("secondary")} />
    </g>
  );
  return (
    <Frame id="ms" title="Mobile Shop POS" tag="Sales and inventory">
      {phone(158, 118, -12, 0.9, 0.35)}
      {phone(480, 138, 11, 0.9, 0.5)}
      {phone(318, 78, 0, 1.05, 0.8)}
      <g transform="translate(560 80) rotate(10)">
        <path d="M0 0 H110 L136 28 L110 56 H0 Z" style={f("secondary")} />
        <circle cx="106" cy="28" r="6" style={f("bg")} />
        <rect x="16" y="18" width="62" height="10" rx="5" style={f("bg", 0.9)} />
        <rect x="16" y="34" width="38" height="8" rx="4" style={f("bg", 0.6)} />
      </g>
    </Frame>
  );
}

function Gym() {
  return (
    <Frame id="gy" title="Gym POS" tag="Memberships and payments">
      <g transform="translate(400 250)">
        <rect x="-190" y="-14" width="380" height="28" rx="14" style={fs("fg", 0.55, "fg", 0.6, 2)} />
        {[-1, 1].map((d) => (
          <g key={d}>
            <rect x={d * 150 - 22} y="-96" width="44" height="192" rx="12" style={fs("primary", 0.95, "fg", 0.5, 3)} />
            <rect x={d * 190 - 16} y="-70" width="32" height="140" rx="10" style={fs("primary", 0.55, "fg", 0.5, 3)} />
            <rect x={d * 112 - 8} y="-52" width="16" height="104" rx="6" style={fs("fg", 0.5, "fg", 0.5, 2)} />
          </g>
        ))}
      </g>
      <path d="M110 430 H250 L282 372 L322 478 L362 396 L392 430 H690" style={ln("secondary", 1, 6)} />
      <g transform="translate(520 80) rotate(7)">
        <rect width="190" height="116" rx="16" style={fs("bg", 1, "fg", 0.5, 2.5)} />
        <circle cx="42" cy="46" r="22" style={f("primary")} />
        <rect x="76" y="32" width="90" height="10" rx="5" style={f("fg", 0.5)} />
        <rect x="76" y="52" width="58" height="9" rx="4" style={f("fg", 0.28)} />
        <rect x="20" y="86" width="150" height="10" rx="5" style={f("primary", 0.25)} />
        <rect x="20" y="86" width="104" height="10" rx="5" style={f("secondary")} />
      </g>
    </Frame>
  );
}

function School() {
  return (
    <Frame id="sc" title="School Management System" tag="Students, staff and fees">
      <g transform="translate(400 190)">
        <path d="M0 -92 L190 -22 L0 48 L-190 -22 Z" style={fs("primary", 1, "fg", 0.5, 3)} />
        <path d="M-110 12 V92 Q0 142 110 92 V12 L0 54 Z" style={fs("primary", 0.7, "fg", 0.5, 3)} />
        <path d="M190 -22 V70" style={ln("secondary", 1, 6)} />
        <circle cx="190" cy="78" r="12" style={f("secondary")} />
      </g>
      <g transform="translate(110 330) rotate(-4)">
        <rect width="250" height="148" rx="14" style={fs("bg", 1, "fg", 0.5, 2.5)} />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <circle cx="30" cy={36 + r * 40} r="11" style={f("fg", 0.3)} />
            {[0, 1, 2, 3, 4].map((cc) => (
              <rect key={cc} x={58 + cc * 36} y={26 + r * 40} width="28" height="20" rx="5" style={f((r + cc) % 4 === 0 ? "secondary" : "primary", 0.7)} />
            ))}
          </g>
        ))}
      </g>
      <g transform="translate(450 340) rotate(4)">
        <rect width="250" height="148" rx="14" style={fs("bg", 1, "fg", 0.5, 2.5)} />
        <path d="M0 40 H250" style={ln("fg", 0.2, 2)} />
        <rect x="18" y="14" width="90" height="12" rx="6" style={f("fg", 0.5)} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M20 ${68 + i * 26} l7 7 l13 -14`} style={ln("primary", 1, 4)} />
            <rect x="56" y={64 + i * 26} width={130 - i * 24} height="9" rx="4" style={f("fg", 0.35)} />
          </g>
        ))}
      </g>
    </Frame>
  );
}

function Restaurant() {
  return (
    <Frame id="re" title="Restaurant POS" tag="Orders, tables and bills">
      <g transform="translate(300 250)">
        <circle r="150" style={fs("bg", 1, "fg", 0.55, 4)} />
        <circle r="108" style={fs("primary", 0.2, "fg", 0.3, 2.5)} />
        <circle r="62" style={fs("bg", 1, "primary", 0.9, 4)} />
        <circle cx="-20" cy="-12" r="14" style={f("secondary")} />
        <circle cx="16" cy="10" r="11" style={f("primary")} />
        <circle cx="-4" cy="26" r="9" style={f("secondary", 0.7)} />
      </g>
      <g transform="translate(110 130)">
        <path d="M0 0 V70 M14 0 V70 M28 0 V70 M0 70 Q14 92 28 70 M14 70 V240" style={ln("fg", 0.7, 5)} />
      </g>
      <g transform="translate(496 130)">
        <path d="M14 0 C-16 50 -2 96 14 100 V240" style={ln("fg", 0.7, 5)} />
      </g>
      <g transform="translate(540 190) rotate(6)">
        <rect width="170" height="216" rx="14" style={fs("bg", 1, "fg", 0.5, 2.5)} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="18" y={30 + i * 32} width="68" height="9" rx="4" style={f("fg", 0.45)} />
            <rect x="112" y={30 + i * 32} width="40" height="9" rx="4" style={f("fg", 0.28)} />
          </g>
        ))}
        <path d="M18 168 H152" style={ln("fg", 0.25, 2)} />
        <rect x="18" y="180" width="134" height="22" rx="11" style={f("primary")} />
      </g>
    </Frame>
  );
}

const map = {
  "laptop-hub": LaptopHub,
  "warsi-computers": Warsi,
  amdhouse: Amdhouse,
  "cash-and-carry-pos": CashCarry,
  "mobile-shop-pos": MobileShop,
  "gym-pos": Gym,
  "school-management-system": School,
  "restaurant-pos": Restaurant,
};

export default function CoverArt({ slug }) {
  const Art = map[slug];
  return Art ? <Art /> : null;
}