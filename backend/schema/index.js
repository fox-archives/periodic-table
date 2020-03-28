import path from "path";
import fs from "fs";
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from "graphql";

// doing graphql only for atoms with many many properties
const graphqlFile = path.join(__dirname, "../public/data/atomGraphql.json");
let atomData;
// eslint-disable-next-line no-unused-vars
let atomMeta;
try {
  const atomGraphQl = JSON.parse(fs.readFileSync(graphqlFile, "utf8"));
  atomData = atomGraphQl.data;
  atomMeta = atomGraphQl.meta;
} catch (err) {
  console.error(err);
}

// const radiusNestedAtomQuery = new GraphQLObjectType({
//   name: "radiusNestedAtomQueryType",
//   fields: {}
// });

const AtomQuery = new GraphQLObjectType({
  name: "AtomQueryType",
  fields: {
    abbreviation: { type: GraphQLString },
    absoluteBoilingPoint: { type: GraphQLFloat },
    absoluteMeltingPoint: { type: GraphQLFloat },
    adiabaticIndex: { type: GraphQLFloat },
    // allotropeNames: { type: GraphQLFloat },
    // allotropicMultiplicities,
    // alternateNames,
    atomicNumber: { type: GraphQLInt },
    atomicRadius: { type: GraphQLInt },
    atomicWeight: { type: GraphQLFloat },
    block: { type: GraphQLString },
    boilingPoint: { type: GraphQLFloat },
    // brinellHardness: { type: },
    bulkModulus: { type: GraphQLFloat },
    casNumber: { type: GraphQLString },
    color: { type: GraphQLString },
    covalentRadius: { type: GraphQLInt },
    criticalPressure: { type: GraphQLFloat },
    criticalTemperature: { type: GraphQLFloat },
    crustAbundance: { type: GraphQLFloat },
    curiePoint: { type: GraphQLInt },
    decayMode: { type: GraphQLString },
    density: { type: GraphQLFloat },
    // discovery Countries,
    discoveryYear: { type: GraphQLInt },
    electricalConductivity: { type: GraphQLFloat },
    electricalType: { type: GraphQLString },
    electronAffinity: { type: GraphQLFloat },
    // electronConfiguration,
    // electronConfigurationString,
    electronegativity: { type: GraphQLFloat },
    // electronShellConfiguration,
    fusionHeat: { type: GraphQLFloat },
    gasAtomicMultiplicities: { type: GraphQLInt },
    group: { type: GraphQLInt },
    humanAbundance: { type: GraphQLFloat },
    // iconColor,
    // ionizationEnergies,
    // isotopeAbundances,
    // knownIsotopes,
    massMagneticSusceptibility: { type: GraphQLFloat },
    meltingPoint: { type: GraphQLFloat },
    meteoriteAbundance: { type: GraphQLFloat },
    mohsHardness: { type: GraphQLFloat },
    molarMagneticSusceptibility: { type: GraphQLFloat },
    molarVolume: { type: GraphQLFloat },
    name: { type: GraphQLString },
    neelPoint: { type: GraphQLFloat },
    neuronMassAbsorption: { type: GraphQLString },
    oceanAbundance: { type: GraphQLFloat },
    period: { type: GraphQLInt },
    phase: { type: GraphQLString },
    poissonRatio: { type: GraphQLFloat },
    // quantumNumbers,
    refractiveIndex: { type: GraphQLFloat },
    resistivity: { type: GraphQLFloat },
    series: { type: GraphQLString },
    shearModulus: { type: GraphQLFloat },
    solarAbundance: { type: GraphQLFloat },
    soundSpeed: { type: GraphQLFloat },
    specificHeat: { type: GraphQLFloat },
    // stableIsotopes,
    standardName: { type: GraphQLString },
    superconductingPoint: { type: GraphQLFloat },
    thermalConductivity: { type: GraphQLFloat },
    thermalExpansion: { type: GraphQLFloat },
    universeAbundance: { type: GraphQLFloat },
    valence: { type: GraphQLInt },
    vanDerWaalsRadius: { type: GraphQLInt },
    vaporizationHeat: { type: GraphQLFloat },
    vickersHardness: { type: GraphQLFloat },
    volumeMagneticSusceptibility: { type: GraphQLFloat },
    youngModulus: { type: GraphQLFloat }
  }
});

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    description: "root query",
    fields: {
      source: {
        type: GraphQLString,
        resolve: () => "myself"
      },
      atoms: {
        type: new GraphQLList(AtomQuery),
        args: {
          min: { type: GraphQLInt },
          max: { type: GraphQLInt }
        },
        resolve: (parent, args) => {
          let atomMin = 0;
          let atomMax = 118;
          if (args.min) atomMin = args.min;
          if (args.max) atomMax = args.max;
          let d = atomData;
          d = d.filter(atom => atom.atomicNumber >= atomMin);
          d = d.filter(atom => atom.atomicNumber <= atomMax);

          return d;
        }
      }
    }
  })
});
