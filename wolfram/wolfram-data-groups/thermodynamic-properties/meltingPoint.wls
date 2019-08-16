#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "melting point",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
