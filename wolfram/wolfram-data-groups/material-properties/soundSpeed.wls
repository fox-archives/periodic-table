#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "sound speed",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
