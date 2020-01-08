#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];
atomTransform[prop_]:= (
  Return@fixUnknowns@N[prop];
);

iterateAtomProperty[
  "atomic radius",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "covalent radius",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "electron configuration",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "electron configuration string",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "electron shell configuration",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "ionization energies",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "quantum numbers",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "van der waals radius",
  Unevaluated[atomTransform]
];
