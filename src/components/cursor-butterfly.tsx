import { useEffect, useRef } from "react";
import "./cursor-butterfly.css";

export function CursorButterfly() {
  const butterfly = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = butterfly.current!;
    const motion = matchMedia("(any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    let x = innerWidth - 56, y = 92, targetX = x, targetY = y;
    let vx = 0, vy = 0, heading = -0.45, phase = 0, elapsed = 0;
    let frame = 0, previous = 0, roll = 0;

    let lastMove = performance.now(), perched = 0;

    function fly(now: number) {
      const dt = Math.min((now - previous) / 1000, 0.032);
      previous = now;
      elapsed += dt;
      const dx = Math.max(35, Math.min(innerWidth - 35, targetX)) - x;
      const dy = Math.max(35, Math.min(innerHeight - 35, targetY)) - y;
      const distance = Math.hypot(dx, dy);
      const gain = Math.min(4, 650 / Math.max(1, distance));
      const ease = 1 - Math.exp(-7 * dt);
      vx += (dx * gain - vx) * ease;
      vy += (dy * gain - vy) * ease;
      x += vx * dt;
      y += vy * dt;
      const speed = Math.hypot(vx, vy);
      const landing = distance < 8 && now - lastMove > 1600;
      perched += ((landing ? 1 : 0) - perched) * (1 - Math.exp(-dt * (landing ? 1.5 : 8)));
      const airborne = 1 - perched;
      const effort = Math.min(speed / 300, 1);
      const aim = speed > 10 ? Math.atan2(vx, -vy) : heading;
      const turn = Math.atan2(Math.sin(aim - heading), Math.cos(aim - heading));
      heading += turn * (1 - Math.exp(-4.8 * dt));
      roll += (Math.tanh(turn) * effort * 38 - roll) * (1 - Math.exp(-6 * dt));

      // A brief glide between bursts keeps the beat from looking mechanical.
      const glide = Math.max(0, Math.sin(elapsed * 2.5)) ** 6 * effort;
      phase += dt * (3 + 23 * effort) * (1 - 0.8 * glide);
      const beat = (1 - Math.cos(phase)) / 2;
      const openAngle = 12 + beat * (34 + 38 * effort) * (1 - 0.75 * glide);
      const fold = openAngle * airborne + (79 + 3 * Math.sin(elapsed * 0.9)) * perched;
      const flex = Math.sin(phase) * (6 + 17 * effort) * airborne;
      node.style.setProperty("--fold", fold.toFixed(2) + "deg");
      node.style.setProperty("--flex", flex.toFixed(2) + "deg");
      node.style.setProperty("--roll", (roll - 9 - 37 * perched).toFixed(2) + "deg");
      node.style.setProperty("--pitch", (15 + effort * 10 + 7 * Math.sin(phase) * airborne).toFixed(2) + "deg");
      node.style.setProperty("--gleam", String(0.15 + 0.72 * (1 - beat)));
      const sway = Math.sin(elapsed * 3) * (1 + 5 * effort) * airborne;
      const lift = (1 - beat) * (1 + 3 * effort) * airborne;
      node.style.transform = `translate3d(${x + Math.cos(heading) * sway}px, ${y + Math.sin(heading) * sway - lift}px, 0) translate(-50%, -50%) rotate(${heading}rad)`;
      frame = requestAnimationFrame(fly);
    }
    function sync() {
      cancelAnimationFrame(frame);
      if (motion.matches && !document.hidden) {
        previous = performance.now();
        frame = requestAnimationFrame(fly);
      }
    }
    function follow(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      lastMove = performance.now();
      targetX = e.clientX + 26;
      targetY = e.clientY - 24;
    }
    sync();
    window.addEventListener("pointermove", follow, { passive: true });
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", follow);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return <div ref={butterfly} className="cursor-butterfly" aria-hidden="true">
    <svg width="0" height="0" className="butterfly-defs" aria-hidden="true">
      <defs>
        <linearGradient id="morpho-silk" x1="0" y1="0" x2="1" y2=".65" gradientUnits="objectBoundingBox">
          <stop stopColor="#11365e"/><stop offset=".28" stopColor="#258fc6"/>
          <stop offset=".5" stopColor="#8af0e7"/><stop offset=".68" stopColor="#359fd9"/>
          <stop offset="1" stopColor="#413c94"/>
        </linearGradient>
        <radialGradient id="wing-flash" cx=".48" cy=".53" r=".61"><stop stopColor="#cefffa"/><stop offset=".5" stopColor="#66dfff" stopOpacity=".48"/><stop offset="1" stopColor="#4389ff" stopOpacity="0"/></radialGradient>
        <linearGradient id="thorax"><stop stopColor="#14101e"/><stop offset=".38" stopColor="#869da2"/><stop offset=".54" stopColor="#425863"/><stop offset="1" stopColor="#101927"/></linearGradient>
        <linearGradient id="morpho-bark" x2=".85" y2="1">
          <stop stopColor="#312622"/><stop offset=".42" stopColor="#96744c"/>
          <stop offset=".64" stopColor="#604434"/><stop offset="1" stopColor="#ac9069"/>
        </linearGradient>
        <pattern id="morpho-scales" width="3.7" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
          <path d="M0 .4l1.1 .25m.6 1.45 1.25-.18" stroke="#fff3db" strokeOpacity=".42" strokeWidth=".48"/>
          <path d="M1.5 .7l1.35 .22" stroke="#171523" strokeOpacity=".55" strokeWidth=".55"/>
        </pattern>
        <g id="morpho-ocellus">
          <ellipse rx="3.9" ry="3.55" fill="#4c382e" stroke="#dac28d" strokeWidth=".75"/>
          <ellipse rx="2.6" ry="2.4" fill="#251e21" stroke="#b08858" strokeWidth=".7"/>
          <circle cx="-.65" cy="-.45" r=".8" fill="#e4ddbc"/>
        </g>
        <path id="morpho-outline" d="M1 11 Q1 -6 18 -23 Q33 -35 45 -36 Q49 -35 45 -17 Q43 -4 35 4 Q39 11 32 19 Q29 23 25 21 Q22 29 18 26 Q13 33 9 28 Q2 25 1 11Z"/>
        <g id="morpho-under">
          <use href="#morpho-outline" fill="url(#morpho-bark)" stroke="#b7a182" strokeWidth=".75"/>
          <path d="M7 14 Q16 21 23 13 Q29 9 33 10 M10 4 Q24 1 30 -13 Q36 -24 43 -28" fill="none" stroke="#d7ba8c" strokeWidth="1.6"/>
          <path d="M6 10 Q18 13 24 7 Q32 3 36 -8 M11 -6 Q24 -17 38 -25" fill="none" stroke="#403126" strokeWidth="1"/>
          <use href="#morpho-ocellus" transform="translate(15 21)"/>
          <use href="#morpho-ocellus" transform="translate(25 16) scale(.77)"/>
          <use href="#morpho-ocellus" transform="translate(38 -17) scale(.66)"/>
          <use href="#morpho-outline" fill="url(#morpho-scales)"/>
        </g>
        <g id="morpho-wing" fill="none" strokeLinejoin="round">
          <path d="M1 0 Q24 -7 36 5 Q39 14 31 20 Q28 23 25 22 Q22 30 17 27 L13 34 Q11 36 11 29 Q3 31 1 13Z" fill="#192339" stroke="#a2b5c3" strokeWidth=".8"/>
          <path d="M3 4 Q20 -3 32 5 Q35 12 28 17 Q24 22 21 19 Q16 29 12 23 Q6 24 3 13Z" fill="url(#morpho-silk)"/>
          <path d="M2 6 Q6 -12 19 -23 Q32 -34 46 -36 Q49 -33 45 -17 Q43 -4 35 4 Q26 11 13 9Z" fill="#142132" stroke="#a2b5c3" strokeWidth=".8"/>
          <path d="M4 5 Q13 -15 28 -23 Q36 -29 41 -28 Q41 -18 36 -11 Q34 -4 28 1 Q19 7 4 5Z" fill="url(#morpho-silk)"/>
          <path d="M4 5 Q13 -15 28 -23 Q36 -29 41 -28 Q41 -18 36 -11 Q34 -4 28 1 Q19 7 4 5Z" fill="url(#wing-flash)" opacity="var(--gleam)"/>
          <path d="M4 5 Q19 -11 40 -27 M16 -7 Q25 -10 37 -12 M4 5 Q20 -2 33 -5 M4 9 Q17 12 28 17 M5 11 Q13 16 16 24" stroke="#153b61" strokeOpacity=".73" strokeWidth="1"/>
          <use href="#morpho-outline" fill="url(#morpho-scales)" opacity=".5"/>
          <g fill="#fff2d3">
            <ellipse cx="42" cy="-28" rx="1.4" ry="2.3"/><circle cx="42" cy="-21" r="1.5"/><circle cx="40" cy="-15" r="1.1"/>
            <circle cx="35" cy="-3" r="1"/><circle cx="30" cy="2" r=".9"/><circle cx="28" cy="20" r="1.2"/><circle cx="22" cy="24" r="1"/>
          </g>
        </g>
      </defs>
    </svg>
    <div className="butterfly-pose">
      {["left", "right"].map(side => (
        <div key={side} className={`butterfly-side butterfly-${side}`}>
          <div className="butterfly-wing">
            {["root", "tip"].map(section => (
              <div key={section} className={`wing-panel wing-${section}`}>
                <svg className="wing-face" viewBox="0 -48 52 96"><use href="#morpho-wing"/></svg>
                <svg className="wing-reverse" viewBox="0 -48 52 96"><use href="#morpho-under" transform="translate(52) scale(-1 1)"/></svg>
              </div>
            ))}
          </div>
        </div>
      ))}
      <svg className="butterfly-body" viewBox="-52 -48 104 96" fill="none">
        <path d="M-1 -3l-5 5 -3 6 M1 -3l5 5 3 6 M-1 1l-4 7 -1 5 M1 1l4 7 1 5" stroke="#a5967c" strokeWidth=".85" strokeLinecap="round"/>
        <path d="M-1 -9 Q-3 -21 -9 -24 M1 -9 Q3 -21 9 -24" stroke="#82929c" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M0 -8 C5 -8 4 9 0 22 C-4 9 -5 -8 0 -8Z" fill="url(#thorax)"/>
        <ellipse cy="-3" rx="3.4" ry="7.5" fill="url(#thorax)"/>
        <circle cy="-11" r="2.8" fill="#354453"/>
      </svg>
    </div>
  </div>;
}

