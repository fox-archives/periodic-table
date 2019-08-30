#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixValue@removeUnknowns[prop];
);

iterateAtomProperty[
  "specific radioactivity",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
