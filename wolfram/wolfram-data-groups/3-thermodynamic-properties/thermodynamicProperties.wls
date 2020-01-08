#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns@N[prop];
);

iterateAtomProperty[
  "absolute boiling point",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "absolute melting point",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "adiabatic index",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "boiling point",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "critical pressure",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "critical temperature",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "curie point",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "fusion heat",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "melting point",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "neel point",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "phase",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "specific heat",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "superconducting point",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "vaporization heat",
  Unevaluated[atomTransform]
];
