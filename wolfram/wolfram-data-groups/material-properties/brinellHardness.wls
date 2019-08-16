#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

IterateAtomProperty[
  "brinell hardness",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
