#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixValue@removeUnknowns[prop];
);

iterateAtomProperty[
  "molar radioactivity",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
