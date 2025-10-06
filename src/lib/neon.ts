export type NeonOptions = {
  /** Overall scale of the glow in px multipliers */
  size?: number;
  /** 0.6–1.6 sensible range */
  intensity?: number;
};

export function buildNeon(hex: string, opts: NeonOptions = {}) {
  const { size = 1, intensity = 1 } = opts;

  const [r, g, b] = hexToRgb(hex);
  // Tube core: mix toward white to emulate hot gas
  const core = mixRgb([r, g, b], [255, 255, 255], 0.35);
  const [cr, cg, cb] = core;

  const a = (x: number) => clamp(x * intensity, 0, 1);
  const px = (x: number) => `${Math.round(x * size)}px`;

  // Tight bright inner text glow
  const textShadow = [
    `0 0 ${px(1)} rgba(${cr},${cg},${cb},${a(0.95)})`,
    `0 0 ${px(2)} rgba(${r},${g},${b},${a(0.85)})`,
    `0 0 ${px(4)} rgba(${r},${g},${b},${a(0.65)})`,
    `0 0 ${px(8)} rgba(${r},${g},${b},${a(0.45)})`,
    `0 0 ${px(14)} rgba(${r},${g},${b},${a(0.3)})`,
    `0 0 ${px(22)} rgba(${r},${g},${b},${a(0.18)})`,
  ].join(', ');

  // Bloom using filter drop-shadows (affects both text & shapes)
  const filter = [
    `drop-shadow(0 0 ${px(4)} rgba(${r},${g},${b},${a(0.45)}))`,
    `drop-shadow(0 0 ${px(10)} rgba(${r},${g},${b},${a(0.28)}))`,
    `drop-shadow(0 0 ${px(18)} rgba(${r},${g},${b},${a(0.18)}))`,
  ].join(' ');

  // Optional box shadow for non-text tubes
  // const boxShadow = [
  //   `inset 0 0 ${px(1)} rgba(${cr},${cg},${cb},${a(0.9)})`,
  //   `0 0 ${px(4)} rgba(${r},${g},${b},${a(0.7)})`,
  //   `0 0 ${px(10)} rgba(${r},${g},${b},${a(0.35)})`,
  //   `0 0 ${px(18)} rgba(${r},${g},${b},${a(0.22)})`,
  // ].join(', ');

  // Slightly tinted tube color (use for text color / stroke)
  const tubeColor = `rgb(${cr} ${cg} ${cb})`;

  // A semi-transparent color for halos & gradients
  const halo = (alpha: number) => `rgba(${r},${g},${b},${a(alpha)})`;

  return { textShadow, filter, tubeColor, halo };
}

/* helpers */
function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function mixRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}
