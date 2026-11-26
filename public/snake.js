(function snakeFollower() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || document.getElementById("cursor-snake")) return;

  const segmentCount = 28;
  const segmentGap = 6.5;
  const cursorGap = 48;
  const points = Array.from({ length: segmentCount }, (_, index) => ({
    x: 80 - index * segmentGap,
    y: 80,
  }));
  let mouseX = 80;
  let mouseY = 80;
  let heading = 0;

  const style = document.createElement("style");
  style.id = "cursor-snake-styles";
  style.textContent = `
    #cursor-snake {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      pointer-events: none;
    }
    .cursor-snake-segment {
      position: fixed;
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 999px;
      background:
        radial-gradient(ellipse at 32% 25%, rgba(255, 255, 255, 0.42) 0 9%, transparent 12%),
        radial-gradient(ellipse at 68% 72%, rgba(255, 255, 255, 0.16) 0 8%, transparent 11%),
        linear-gradient(135deg, #3a3a3d 0%, #09090b 48%, #000 100%);
      background-size: 7px 6px, 7px 6px, 100% 100%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.12);
      will-change: transform;
    }
    .cursor-snake-head {
      position: fixed;
      width: 29px;
      height: 20px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 48% 72% 72% 48%;
      background:
        radial-gradient(ellipse at 35% 26%, rgba(255, 255, 255, 0.42) 0 7%, transparent 10%),
        radial-gradient(ellipse at 70% 70%, rgba(255, 255, 255, 0.14) 0 6%, transparent 9%),
        linear-gradient(145deg, #444449 0%, #0a0a0c 42%, #000 100%);
      background-size: 8px 7px, 8px 7px, 100% 100%;
      box-shadow: 0 3px 7px rgba(0, 0, 0, 0.55), inset 2px 2px 3px rgba(255, 255, 255, 0.13);
      transform-origin: center;
      will-change: transform;
    }
    .cursor-snake-eye {
      position: absolute;
      right: 6px;
      width: 3.5px;
      height: 3.5px;
      border-radius: 50%;
      background: #d7d7dc;
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.65);
    }
    .cursor-snake-eye:first-child { top: 3px; }
    .cursor-snake-eye:nth-child(2) { bottom: 3px; }
    .cursor-snake-tongue {
      position: absolute;
      right: -10px;
      top: 9px;
      width: 11px;
      height: 1.5px;
      border-radius: 2px;
      background: #d51f45;
    }
    .cursor-snake-tongue::before,
    .cursor-snake-tongue::after {
      content: "";
      position: absolute;
      right: -3px;
      width: 5px;
      height: 1.5px;
      border-radius: 2px;
      background: #d51f45;
      transform-origin: left center;
    }
    .cursor-snake-tongue::before { transform: rotate(28deg); }
    .cursor-snake-tongue::after { transform: rotate(-28deg); }
    }
  `;
  document.head.appendChild(style);

  const snake = document.createElement("div");
  snake.id = "cursor-snake";
  snake.ariaHidden = "true";

  const head = document.createElement("div");
  head.className = "cursor-snake-head";
  head.innerHTML = '<span class="cursor-snake-eye"></span><span class="cursor-snake-eye"></span><span class="cursor-snake-tongue"></span>';
  snake.appendChild(head);

  const body = points.slice(1).map((_, index) => {
    const segment = document.createElement("div");
    segment.className = "cursor-snake-segment";
    const progress = index / Math.max(1, segmentCount - 2);
    const size = progress < 0.48
      ? 14 + Math.sin((progress / 0.48) * Math.PI * 0.5) * 6
      : 20 - ((progress - 0.48) / 0.52) * 15;
    segment.style.width = `${size}px`;
    segment.style.height = `${size}px`;
    segment.style.opacity = String(Math.max(0.55, 1 - index * 0.03));
    snake.appendChild(segment);
    return { element: segment, size };
  });

  document.body.appendChild(snake);

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animate(timestamp) {
    if (!snake.isConnected) return;

    const headPoint = points[0];
    const targetX = mouseX - headPoint.x;
    const targetY = mouseY - headPoint.y;
    const targetDistance = Math.hypot(targetX, targetY);

    if (targetDistance > cursorGap) {
      heading = Math.atan2(targetY, targetX);
      const step = Math.min(11, Math.max(1.5, (targetDistance - cursorGap) * 0.16));
      headPoint.x += Math.cos(heading) * step;
      headPoint.y += Math.sin(heading) * step;
    }

    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      const dx = previous.x - current.x;
      const dy = previous.y - current.y;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance > segmentGap) {
        const movement = distance - segmentGap;
        current.x += (dx / distance) * movement;
        current.y += (dy / distance) * movement;
      }
    }

    head.style.transform = `translate3d(${headPoint.x - 14.5}px, ${headPoint.y - 10}px, 0) rotate(${heading}rad)`;
    body.forEach(({ element, size }, index) => {
      const point = points[index + 1];
      const previous = points[Math.max(0, index)];
      const next = points[Math.min(points.length - 1, index + 2)];
      const bodyAngle = Math.atan2(next.y - previous.y, next.x - previous.x);
      const wave = Math.sin(timestamp * 0.0045 - index * 0.58) * Math.min(3.5, index * 0.2);
      const waveX = -Math.sin(bodyAngle) * wave;
      const waveY = Math.cos(bodyAngle) * wave;
      element.style.transform = `translate3d(${point.x + waveX - size / 2}px, ${point.y + waveY - size / 2}px, 0)`;
    });

    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);
})();
