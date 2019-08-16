#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

iterateAtomProperty[
  "van der waals radius",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
