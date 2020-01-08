#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "atomic number",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "atomic weight",
  Unevaluated[atomTransform]
];
