"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Procedural backdrop for the hero: a drifting lattice of nodes joined by
 * hairlines that fade with distance.
 *
 * Chosen over background footage because it costs no network asset, cannot
 * date the way a stock clip does, and reads as instrumentation rather than
 * decoration — which is the register the rest of the page is in.
 *
 * Perf hygiene, since this runs behind the fold's headline:
 *  - device pixel ratio is clamped to 2
 *  - the loop stops when the tab is hidden or the hero scrolls out of view
 *  - reduced motion draws a single static frame and never starts a loop
 */

/** Target spacing between lattice nodes, in CSS px. */
const SPACING = 104;
/** Hard cap on nodes regardless of viewport, to bound per-frame cost. */
const MAX_NODES = 220;
/** Nodes closer than this get joined by a line. */
const LINK_DISTANCE = 150;
/** How far a node wanders from its lattice origin, in px. */
const WANDER = 26;

interface Node {
  ox: number;
  oy: number;
  x: number;
  y: number;
  phase: number;
  speed: number;
  drift: number;
}

function buildNodes(width: number, height: number): Node[] {
  const cols = Math.max(2, Math.round(width / SPACING));
  const rows = Math.max(2, Math.round(height / SPACING));
  const nodes: Node[] = [];

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      if (nodes.length >= MAX_NODES) return nodes;
      // Offset alternate rows so the lattice reads as a field, not graph paper.
      const stagger = row % 2 === 0 ? 0 : (width / cols) * 0.5;
      nodes.push({
        ox: (col * width) / cols + stagger,
        oy: (row * height) / rows,
        x: 0,
        y: 0,
        phase: Math.random() * Math.PI * 2,
        speed: 0.00016 + Math.random() * 0.00022,
        drift: 0.5 + Math.random() * 0.5,
      });
    }
  }
  return nodes;
}

function draw(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  width: number,
  height: number,
  time: number
) {
  for (const node of nodes) {
    node.x = node.ox + Math.cos(time * node.speed + node.phase) * WANDER * node.drift;
    node.y = node.oy + Math.sin(time * node.speed * 1.3 + node.phase) * WANDER * node.drift;
  }

  ctx.clearRect(0, 0, width, height);

  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.hypot(dx, dy);
      if (distance > LINK_DISTANCE) continue;

      ctx.strokeStyle = `rgba(255,255,255,${(1 - distance / LINK_DISTANCE) * 0.16})`;
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "rgba(255,255,255,0.42)";
  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let onScreen = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = buildNodes(width, height);
      draw(ctx, nodes, width, height, 0);
    };

    const tick = (time: number) => {
      draw(ctx, nodes, width, height, time);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduced || frame) return;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => {
      if (document.hidden || !onScreen) stop();
      else start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onVisibility();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-canvas pointer-events-none absolute inset-0 size-full"
    />
  );
}
