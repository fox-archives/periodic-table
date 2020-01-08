#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns@N[prop];
);

iterateAtomProperty[
  "allotropic multiplicities",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "common compound names",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "electron affinity",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "electronegativity",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "gas atomic multiplicities",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "valence",
  Unevaluated[atomTransform]
];
