#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns@N[prop];
);

iterateAtomProperty[
  "brinell hardness",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "bulk modulus",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "density",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "mohs hardness",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "molar volume",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "poisson ratio",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "shear modulus",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "sound speed",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "thermal conductivity",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "thermal expansion",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "vickers hardness",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "young modulus",
  Unevaluated[atomTransform]
];
