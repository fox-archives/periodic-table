#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "absolute boiling point",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
