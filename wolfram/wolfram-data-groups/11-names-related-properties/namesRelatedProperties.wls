#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns@N[prop];
);

iterateAtomProperty[
  "abbreviation",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "allotrope names",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "alternate names",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "c a s number",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "icon color",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "name",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "standard name",
  Unevaluated[atomTransform]
];
