#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "volume magnetic susceptibility",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
