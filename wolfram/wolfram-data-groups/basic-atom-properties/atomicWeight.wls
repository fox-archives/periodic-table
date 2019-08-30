#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixValue@removeUnknowns[prop];
);

iterateAtomProperty[
  "atomic weight",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
