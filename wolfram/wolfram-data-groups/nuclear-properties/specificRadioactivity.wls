#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "specific radioactivity",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
