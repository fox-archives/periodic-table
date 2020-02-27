#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

allotropicMultiplicitiesAtomTransform[prop_, name_] := (
  Return[prop];
);
iterateAtomProperty[
  "allotropic multiplicities",
  Unevaluated[allotropicMultiplicitiesAtomTransform]
];

iterateAtomProperty[
  "common compound names",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "electron affinity",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "electronegativity",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "gas atomic multiplicities",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "valence",
  Unevaluated[atomTransformFixUnknownsWithN]
];
