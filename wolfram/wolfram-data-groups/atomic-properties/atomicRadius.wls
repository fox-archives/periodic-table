#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixValue@removeUnknowns@N[prop];
);

iterateAtomProperty[
  "atomic radius",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
