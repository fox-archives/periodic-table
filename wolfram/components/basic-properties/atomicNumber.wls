#!/usr/bin/env wolframscript
(* ::Package:: *)

SetSystemOptions["DataOptions" -> "ReturnQuantities" -> False];
Import["../commonMethods.wls"];

atomTransform[atomProperty_]:= (
  Return[atomProperty];
);

IterateAtomProperty[
  "AtomicNumber",
  "Atomic Number",
  Hold[atomTransform],
  "lanthanites case",
  "actinides case",
  "atomicNumber.json"
];

Print["Atomic Number Done"];
