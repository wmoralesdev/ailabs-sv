"use node";

import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import { PKPass } from "passkit-generator";
import { PNG } from "pngjs";
import { v } from "convex/values";

import { internalAction } from "./_generated/server";
import {
  FOUNDER_WHATSAPP_VARIANTS,
  PASS_JSON_COLORS,
  buildFounderPassBarcodeUrl,
  getPassLinksQrUrl,
} from "./lib/founder_pass_config";
import {
  FOUNDER_LOCKUP_LOGO_1X,
  FOUNDER_LOCKUP_LOGO_2X,
  FOUNDER_LOCKUP_LOGO_3X,
} from "./lib/founder_lockup_png_b64";
import type { FounderPassVariant } from "./lib/founder_pass_config";

const DEFAULT_ORG = "ailabs";

function solidPng(width: number, height: number, rgb: { r: number; g: number; b: number }): Buffer {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      png.data[idx] = rgb.r;
      png.data[idx + 1] = rgb.g;
      png.data[idx + 2] = rgb.b;
      png.data[idx + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

/** Gray card (#404040) blending to white at bottom (QR zone) */
function stripPng(width: number, height: number): Buffer {
  const top = { r: 64, g: 64, b: 64 };
  const bottom = { r: 255, g: 255, b: 255 };
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    const t = height <= 1 ? 0 : y / (height - 1);
    const blend = t * t;
    const r = Math.round(top.r + (bottom.r - top.r) * blend);
    const g = Math.round(top.g + (bottom.g - top.g) * blend);
    const b = Math.round(top.b + (bottom.b - top.b) * blend);
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

function readRequiredEnv(name: string): string {
  const val = process.env[name]?.trim();
  if (!val) {
    throw new Error(
      `Missing ${name}. Add Apple Wallet certs and IDs in Convex env (see .env.example).`,
    );
  }
  return val;
}

function founderPassFilename(variant: FounderPassVariant): string {
  switch (variant) {
    case "links":
      return "ailabs-founder-links.pkpass";
    case "walter":
      return "ailabs-founder-walter.pkpass";
    case "daniela":
      return "ailabs-founder-daniela.pkpass";
  }
}

export const buildFounderPassBuffer = internalAction({
  args: {
    variant: v.union(v.literal("links"), v.literal("walter"), v.literal("daniela")),
  },
  handler: (_ctx, { variant }: { variant: FounderPassVariant }) => {
    const wwdr = readRequiredEnv("APPLE_PASS_WWDR_PEM");
    const signerCert = readRequiredEnv("APPLE_PASS_SIGNER_CERT_PEM");
    const signerKey = readRequiredEnv("APPLE_PASS_SIGNER_KEY_PEM");
    const signerKeyPassphrase = process.env.APPLE_PASS_SIGNER_KEY_PASSPHRASE?.trim() || undefined;
    const passTypeId = readRequiredEnv("APPLE_PASS_TYPE_ID");
    const teamId = readRequiredEnv("APPLE_TEAM_ID");
    const organizationName =
      process.env.APPLE_PASS_ORGANIZATION_NAME?.trim() || DEFAULT_ORG;

    const w = FOUNDER_WHATSAPP_VARIANTS.walter;
    const d = FOUNDER_WHATSAPP_VARIANTS.daniela;
    const barcodeUrl = buildFounderPassBarcodeUrl(variant);
    const serialNumber = `founder-${variant}-${randomUUID()}`;
    const filename = founderPassFilename(variant);

    const linksBack = {
      key: "links",
      label: "Links",
      value: `Escanea para abrir ${getPassLinksQrUrl()}`,
    } as const;
    const whatsappBack = {
      key: "whatsapp",
      label: "WhatsApp",
      value:
        "Escanea el código QR para chatear. Mensaje sugerido en español al abrir el chat.",
    } as const;

    const secondaryFields =
      variant === "links"
        ? [
            { key: "walter", label: w.roleLabel, value: w.fullName },
            { key: "daniela", label: d.roleLabel, value: d.fullName },
          ]
        : variant === "walter"
          ? [{ key: "walter", label: w.roleLabel, value: w.fullName }]
          : [{ key: "daniela", label: d.roleLabel, value: d.fullName }];

    const backFields =
      variant === "links"
        ? [
            {
              key: "walter_title",
              label: "Walter Morales",
              value: w.titleLine,
            },
            {
              key: "daniela_title",
              label: "Daniela Huezo",
              value: d.titleLine,
            },
            linksBack,
          ]
        : variant === "walter"
          ? [
              {
                key: "walter_title",
                label: "Walter Morales",
                value: w.titleLine,
              },
              whatsappBack,
            ]
          : [
              {
                key: "daniela_title",
                label: "Daniela Huezo",
                value: d.titleLine,
              },
              whatsappBack,
            ];

    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: passTypeId,
      serialNumber,
      teamIdentifier: teamId,
      organizationName,
      description: "ailabs Founder ticket",
      foregroundColor: PASS_JSON_COLORS.foregroundColor,
      backgroundColor: PASS_JSON_COLORS.backgroundColor,
      labelColor: PASS_JSON_COLORS.labelColor,
      eventTicket: {
        headerFields: [],
        primaryFields: [
          {
            key: "title",
            label: "AILABS",
            value: "Founders",
          },
        ],
        secondaryFields,
        auxiliaryFields: [],
        backFields,
      },
    };

    const accent = { r: 139, g: 123, b: 199 };
    const icon29 = solidPng(29, 29, accent);
    const icon58 = solidPng(58, 58, accent);
    const icon87 = solidPng(87, 87, accent);
    const strip375 = stripPng(375, 120);
    const strip750 = stripPng(750, 240);
    const strip1125 = stripPng(1125, 360);

    const pass = new PKPass(
      {
        "pass.json": Buffer.from(JSON.stringify(passJson), "utf8"),
        "icon.png": icon29,
        "icon@2x.png": icon58,
        "icon@3x.png": icon87,
        "logo.png": Buffer.from(FOUNDER_LOCKUP_LOGO_1X, "base64"),
        "logo@2x.png": Buffer.from(FOUNDER_LOCKUP_LOGO_2X, "base64"),
        "logo@3x.png": Buffer.from(FOUNDER_LOCKUP_LOGO_3X, "base64"),
        "strip.png": strip375,
        "strip@2x.png": strip750,
        "strip@3x.png": strip1125,
      },
      {
        wwdr,
        signerCert,
        signerKey,
        signerKeyPassphrase,
      },
      {
        serialNumber,
        description: "ailabs Founder ticket",
      },
    );

    pass.setBarcodes({
      format: "PKBarcodeFormatQR",
      message: barcodeUrl,
      messageEncoding: "iso-8859-1",
    });

    const buffer = pass.getAsBuffer();
    return {
      base64: buffer.toString("base64"),
      filename,
    };
  },
});
