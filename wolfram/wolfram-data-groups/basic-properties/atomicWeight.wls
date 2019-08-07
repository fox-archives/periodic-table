#!/usr/bin/env wolframscript
(* ::Package:: *)

SetSystemOptions["DataOptions" -> "ReturnQuantities" -> False];
Import["../commonMethods.wls"];

atomTransform[atomProperty_]:= (
  Return[atomProperty];
);

IterateAtomProperty[
  "AtomicWeight",
  "Atomic Weight",
  Hold[atomTransform],
  "lanthanites case",
  "actinides case",
  "atomicWeight.json"
];

Print["Atomic Weight Done"];
