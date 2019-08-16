#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

iterateAtomProperty[
  "atomic weight",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
