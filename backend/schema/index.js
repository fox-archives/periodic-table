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
    atomicNumber: { type: GraphQLInt },
    atomicWeight: { type: GraphQLFloat },
    decayMode: { type: GraphQLString },
    neuronMassAbsorption: { type: GraphQLFloat },
    name: { type: GraphQLString }
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

          console.log(d);
          return d;
        }
      }
    }
  })
});
