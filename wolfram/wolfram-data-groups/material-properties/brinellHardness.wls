#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

IterateAtomProperty[
  "brinel hardness",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];

Print["Atomic Number Done"];
