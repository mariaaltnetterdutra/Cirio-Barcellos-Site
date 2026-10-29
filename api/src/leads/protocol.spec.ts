import { PROTOCOL_PATTERN, generateProtocol } from "./protocol";

describe("generateProtocol", () => {
  it("segue o formato CB-ANO-XXXXX sem caracteres confusos", () => {
    for (let i = 0; i < 200; i += 1) {
      expect(generateProtocol(new Date("2026-10-29T12:00:00Z"))).toMatch(PROTOCOL_PATTERN);
    }
  });

  it("usa o ano informado", () => {
    expect(generateProtocol(new Date("2027-01-02T12:00:00Z"))).toMatch(/^CB-2027-/);
  });
});
