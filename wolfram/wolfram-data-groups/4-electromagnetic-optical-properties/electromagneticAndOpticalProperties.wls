#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns@N[prop];
);

iterateAtomProperty[
  "color",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "electrical conductivity",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "electrical type",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "mass magnetic susceptibility",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "molar magnetic susceptibility",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "refractive index",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "resistivity",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "volume magnetic susceptibility",
  Unevaluated[atomTransform]
];
