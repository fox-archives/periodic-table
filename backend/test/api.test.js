import fetch from "node-fetch";

import { app } from "../app";
import { config } from "../config";

const port = process.env.TEST_PORT || config.TEST_PORT || 5005;

describe("test api", () => {
  let server;
  beforeAll(done => {
    server = app.listen(port, done);
  });
  afterAll(done => {
    server.close();
    done();
  });

  test("calling many elements works without error", async () => {
    const query = `{
source,
atoms {
  abbreviation
  absoluteBoilingPoint
  absoluteMeltingPoint
  adiabaticIndex
  atomicNumber
  atomicRadius
  atomicWeight
  block
  boilingPoint
  bulkModulus
  casNumber
  color
  covalentRadius
  criticalPressure
  criticalTemperature
  crustAbundance
  curiePoint
  decayMode
  density
  discoveryYear
  electricalConductivity
  electricalType
  electronAffinity
  electronegativity
  fusionHeat
  gasAtomicMultiplicities
  group
  humanAbundance
  massMagneticSusceptibility
  meltingPoint
  meteoriteAbundance
  mohsHardness
  molarMagneticSusceptibility
  molarVolume
  name
  neelPoint
  neuronMassAbsorption
  oceanAbundance
  period
  phase
  poissonRatio
  refractiveIndex
  resistivity
  series
  shearModulus
  solarAbundance
  soundSpeed
  specificHeat
  standardName
  superconductingPoint
  thermalConductivity
  thermalExpansion
  universeAbundance
  valence
  vanDerWaalsRadius
  vaporizationHeat
  vickersHardness
  volumeMagneticSusceptibility
  youngModulus
}}`;

    const raw = await fetch(`http://localhost:${port}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ query })
    });

    expect(raw.statusText).toBe("OK");
    expect(raw.status).toBe(200);
  });
});
