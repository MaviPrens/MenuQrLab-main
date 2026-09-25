import { describe, it, expect } from "vitest";
import { addViaMarker } from "./via";

describe("addViaMarker", () => {
  it("tags relative restaurant paths", () => {
    expect(addViaMarker("/restaurants/pizza-house", "qr")).toBe("/restaurants/pizza-house?via=qr");
    expect(addViaMarker("/restaurants/pizza-house/menu", "qr")).toBe(
      "/restaurants/pizza-house/menu?via=qr",
    );
  });

  it("tags absolute restaurant URLs and respects existing query/hash", () => {
    expect(addViaMarker("https://x.com/restaurants/ph", "qr")).toBe(
      "https://x.com/restaurants/ph?via=qr",
    );
    expect(addViaMarker("https://x.com/restaurants/ph?ref=a", "qr")).toBe(
      "https://x.com/restaurants/ph?ref=a&via=qr",
    );
    expect(addViaMarker("/restaurants/ph#menu", "qr")).toBe("/restaurants/ph?via=qr#menu");
  });

  it("leaves external / non-restaurant links and already-tagged links untouched", () => {
    expect(addViaMarker("https://order.example.com/ph", "qr")).toBe("https://order.example.com/ph");
    expect(addViaMarker("/restaurants/ph?via=qr", "qr")).toBe("/restaurants/ph?via=qr");
    expect(addViaMarker("", "qr")).toBe("");
    expect(addViaMarker(null, "qr")).toBe("");
  });
});
