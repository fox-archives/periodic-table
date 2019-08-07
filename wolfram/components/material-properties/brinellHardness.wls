#!/usr/bin/env wolframscript
(* ::Package:: *)

SetSystemOptions["DataOptions" -> "ReturnQuantities" -> False];
Import["../commonMethods.wls"];

atomTransform[atomProperty_]:= (
  Return[atomProperty];
);

IterateAtomProperty[
  "BrinellHardness",
  "Brinell Hardness",
  Hold[atomTransform],
  "lanthanites case",
  "actinides case",
  "brinellHardness.json"
];

Print["Atomic Number Done"];
