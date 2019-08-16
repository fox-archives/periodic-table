#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

IterateAtomProperty[
  "atomic weight",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
