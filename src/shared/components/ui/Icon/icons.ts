export type IconShape =
  | { kind: "path"; d: string }
  | { kind: "circle"; cx: number; cy: number; r: number }
  | { kind: "rect"; x: number; y: number; width: number; height: number; rx: number };

export type IconName =
  | "menu"
  | "close"
  | "arrow-right"
  | "shield"
  | "patrimonio"
  | "building"
  | "car"
  | "home"
  | "briefcase"
  | "globe"
  | "key"
  | "message"
  | "clipboard"
  | "check"
  | "info"
  | "pin"
  | "phone"
  | "image"
  | "user"
  | "star"
  | "map"
  | "build"
  | "tool"
  | "trend"
  | "plus";

export const ICONS: Record<IconName, readonly IconShape[]> = {
  menu: [{ kind: "path", d: "M4 7h16M4 12h16M4 17h16" }],
  close: [{ kind: "path", d: "M6 6l12 12M18 6L6 18" }],
  "arrow-right": [{ kind: "path", d: "M5 12h14M13 6l6 6-6 6" }],
  shield: [
    { kind: "path", d: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" },
    { kind: "path", d: "M9 12l2 2 4-4" },
  ],
  patrimonio: [
    { kind: "path", d: "M3 21h18M5 21V10l7-5 7 5v11" },
    { kind: "path", d: "M9.5 21v-5h5v5" },
  ],
  building: [
    {
      kind: "path",
      d: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M3 21h18M8 7h4M8 11h4M8 15h4",
    },
  ],
  car: [
    { kind: "path", d: "M3 16v-4l2-5h14l2 5v4H3z" },
    { kind: "circle", cx: 7.5, cy: 16.5, r: 1.8 },
    { kind: "circle", cx: 16.5, cy: 16.5, r: 1.8 },
    { kind: "path", d: "M3 12h18" },
  ],
  home: [
    { kind: "path", d: "M3 11l9-7 9 7" },
    { kind: "path", d: "M5 10v10h14V10M10 20v-6h4v6" },
  ],
  briefcase: [
    { kind: "rect", x: 3, y: 7, width: 18, height: 13, rx: 2 },
    { kind: "path", d: "M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M3 13h18" },
  ],
  globe: [
    { kind: "circle", cx: 12, cy: 12, r: 9 },
    {
      kind: "path",
      d: "M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z",
    },
  ],
  key: [
    { kind: "circle", cx: 15.5, cy: 8.5, r: 4 },
    { kind: "path", d: "M12.6 11.4L4 20v2h3v-2h2v-2h2l1.6-1.6" },
  ],
  message: [{ kind: "path", d: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" }],
  clipboard: [
    { kind: "rect", x: 5, y: 4, width: 14, height: 17, rx: 2 },
    { kind: "rect", x: 9, y: 2, width: 6, height: 4, rx: 1 },
    { kind: "path", d: "M9 11.5h6M9 15.5h4" },
  ],
  check: [{ kind: "path", d: "M5 12.5l4.5 4.5L19 7.5" }],
  info: [
    { kind: "circle", cx: 12, cy: 12, r: 9 },
    { kind: "path", d: "M12 11v5M12 8h.01" },
  ],
  pin: [
    { kind: "path", d: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" },
    { kind: "circle", cx: 12, cy: 9.5, r: 2.5 },
  ],
  phone: [
    {
      kind: "path",
      d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
    },
  ],
  image: [
    { kind: "rect", x: 3, y: 5, width: 18, height: 14, rx: 2 },
    { kind: "circle", cx: 8.5, cy: 10, r: 1.5 },
    { kind: "path", d: "M21 16l-5-5-9 8" },
  ],
  user: [
    { kind: "circle", cx: 12, cy: 8, r: 4 },
    { kind: "path", d: "M4 21a8 8 0 0 1 16 0" },
  ],
  star: [{ kind: "path", d: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3l-5.5 2.9 1-6.2L3 9.6l6.2-.9z" }],
  map: [
    { kind: "path", d: "M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" },
    { kind: "path", d: "M9 3v15M15 6v15" },
  ],
  build: [{ kind: "path", d: "M3 20h18M4 20v-5h7v5M13 20v-5h7v5M7.5 15v-5h9v5M10.5 10V5.5h3V10" }],
  tool: [
    {
      kind: "path",
      d: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.4-.4-2.6z",
    },
  ],
  trend: [
    { kind: "path", d: "M3 17l6-6 4 4 8-8" },
    { kind: "path", d: "M15 7h6v6" },
  ],
  plus: [{ kind: "path", d: "M12 5v14M5 12h14" }],
};
