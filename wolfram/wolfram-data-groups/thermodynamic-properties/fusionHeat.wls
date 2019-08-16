#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "fusion heat",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
