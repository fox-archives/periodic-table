#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "isotope lifetimes",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
