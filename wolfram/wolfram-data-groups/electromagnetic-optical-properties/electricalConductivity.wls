#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixValue@removeUnknowns[prop];
);

iterateAtomProperty[
  "electrical conductivity",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
