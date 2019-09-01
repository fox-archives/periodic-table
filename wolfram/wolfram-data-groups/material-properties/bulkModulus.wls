#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns@N[prop];
);

iterateAtomProperty[
  "bulk modulus",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
