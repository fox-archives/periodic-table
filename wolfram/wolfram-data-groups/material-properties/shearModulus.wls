#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "shear modulus",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
