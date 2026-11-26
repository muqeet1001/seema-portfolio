import { useEffect, useRef } from "react";
import "./cursor-kitten.css";

// Direction, alert, and idle sequencing adapted from the portfolio's oneko.js.
const spriteSets: Record<string, number[][]> = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

const tickMs = 100;
const tileSize = 56;
const radius = tileSize / 2;

export function CursorKitten() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const element = node;
    const enabled = window.matchMedia("(any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    let x = 40, y = 40, targetX = x, targetY = y;
    let frameCount = 0, idleTime = 0, idleAnimationFrame = 0;
    let idleAnimation: string | null = null;
    let timer = 0;

    function setSprite(name: string, frame: number) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      element.style.backgroundPosition = `${sprite[0] * tileSize}px ${sprite[1] * tileSize}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      // every ~ 20 seconds
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) == 0 &&
        idleAnimation == null
      ) {
        let availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (x < 32) {
          availableIdleAnimations.push("scratchWallW");
        }
        if (y < 32) {
          availableIdleAnimations.push("scratchWallN");
        }
        if (x > window.innerWidth - 32) {
          availableIdleAnimations.push("scratchWallE");
        }
        if (y > window.innerHeight - 32) {
          availableIdleAnimations.push("scratchWallS");
        }
        idleAnimation =
          availableIdleAnimations[
          Math.floor(Math.random() * availableIdleAnimations.length)
          ];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      const diffX = x - targetX;
      const diffY = y - targetY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < 18) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        // count down after being alerted before moving
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction;
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      const travel = 10;
      x -= (diffX / distance) * travel;
      y -= (diffY / distance) * travel;

      x = Math.min(Math.max(radius, x), window.innerWidth - radius);
      y = Math.min(Math.max(radius, y), window.innerHeight - radius);

      element.style.left = `${x - radius}px`;
      element.style.top = `${y - radius}px`;
    }

    function follow(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !enabled.matches) return;
      targetX = Math.max(radius, Math.min(window.innerWidth - radius, event.clientX));
      targetY = Math.max(radius, Math.min(window.innerHeight - radius, event.clientY));
      if (!timer) {
        const bounds = element.getBoundingClientRect();
        x = bounds.left + bounds.width / 2;
        y = bounds.top + bounds.height / 2;
        frame();
        timer = window.setInterval(frame, tickMs);
      }
    }
    function stop() {
      window.clearInterval(timer);
      timer = 0;
      element.style.removeProperty("left");
      element.style.removeProperty("top");
      setSprite("idle", 0);
    }
    window.addEventListener("pointermove", follow, { passive: true });
    enabled.addEventListener("change", stop);
    return () => {
      stop();
      window.removeEventListener("pointermove", follow);
      enabled.removeEventListener("change", stop);
    };
  }, []);
  return <span ref={ref} className="cursor-kitten" aria-hidden="true" />;
}
