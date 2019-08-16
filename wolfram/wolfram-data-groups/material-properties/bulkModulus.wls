#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[atomProperty_]:= (
  Return[N[atomProperty]];
);

IterateAtomProperty[
  "Bulk Modulus",
  "BrinellHardness",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case",
  "bulkModulus.json"
];

Print["Bulk Modulus Done"];
