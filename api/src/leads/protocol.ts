import { randomInt } from "node:crypto";

const PROTOCOL_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const PROTOCOL_CODE_LENGTH = 5;

export function generateProtocol(now: Date = new Date()): string {
  let code = "";
  for (let i = 0; i < PROTOCOL_CODE_LENGTH; i += 1) {
    code += PROTOCOL_ALPHABET[randomInt(PROTOCOL_ALPHABET.length)];
  }
  return `CB-${now.getFullYear()}-${code}`;
}

export const PROTOCOL_PATTERN = /^CB-\d{4}-[2-9A-HJ-NP-Z]{5}$/;
