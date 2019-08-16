#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

iterateAtomProperty[
  "brinell hardness",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
