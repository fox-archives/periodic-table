#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "brinell hardness",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "bulk modulus",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "density",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "mohs hardness",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "molar volume",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "poisson ratio",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "shear modulus",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "sound speed",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "thermal conductivity",
  Unevaluated[atomTransformFixUnknownsWithN]
];

thermalExpansionAtomTransform[prop_, name_] := (
  Return@fixUnknowns@N[prop, 10];
);
iterateAtomProperty[
  "thermal expansion",
  Unevaluated[thermalExpansionAtomTransform]
];

iterateAtomProperty[
  "vickers hardness",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "young modulus",
  Unevaluated[atomTransformFixUnknownsWithN]
];
