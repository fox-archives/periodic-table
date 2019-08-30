#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixValue@removeUnknowns[prop];
);

iterateAtomProperty[
  "quantum numbers",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
