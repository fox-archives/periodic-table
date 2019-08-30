#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixValue@removeUnknowns[prop];
);

iterateAtomProperty[
  "electrical type",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
