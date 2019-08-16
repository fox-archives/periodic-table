#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

iterateAtomProperty[
  "covalent radius",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
