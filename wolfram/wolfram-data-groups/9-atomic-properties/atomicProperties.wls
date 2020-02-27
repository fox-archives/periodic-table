#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "atomic radius",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "covalent radius",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "electron configuration",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "electron configuration string",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "electron shell configuration",
  Unevaluated[atomTransformFixUnknownsWithN]
];

ionizationEnergiesMap[e_] := (
  Return@fixUnknowns@N[e];
);
ionizationEnergiesAtomTransform[prop_, name_] := (
  Return@Map[ionizationEnergiesMap, prop];
);
iterateAtomProperty[
  "ionization energies",
  Unevaluated[ionizationEnergiesAtomTransform]
];

iterateAtomProperty[
  "quantum numbers",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "van der waals radius",
  Unevaluated[atomTransformFixUnknownsWithN]
];
