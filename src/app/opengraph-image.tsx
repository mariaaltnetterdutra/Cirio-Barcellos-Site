import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { COMPANY } from "@/shared/constants/company";

export const alt = "Consórcio imobiliário Porto Bank | Círio & Barcellos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BACKGROUND = "#1b2536";
const GOLD = "#d8ba5a";
const TEXT = "#f5f6f8";
const TEXT_MUTED = "#b6bfcd";

async function readBrandImage(fileName: string): Promise<string> {
  const file = await readFile(path.join(process.cwd(), "public", "brand", fileName));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const [logo, portoBank] = await Promise.all([
    readBrandImage("logo-nome-branco.png"),
    readBrandImage("porto-bank-negativo.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 80px",
          background: BACKGROUND,
          color: TEXT,
        }}
      >
        <img src={logo} alt="" width={346} height={80} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 6, background: GOLD, marginBottom: 32 }} />
          <div style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 1040 }}>Consórcio imobiliário Porto Bank</div>
          <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.3, maxWidth: 1040, color: TEXT_MUTED }}>
            Planejamento e atendimento próximo, do primeiro contato à contemplação.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, color: GOLD }}>{`${COMPANY.name} · ${COMPANY.city}`}</div>
          <img src={portoBank} alt="" width={264} height={52} />
        </div>
      </div>
    ),
    size,
  );
}
