#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[atomProperty_]:= (
  Print@atomProperty;
  Return[atomProperty];
);

IteratePeriodicTable[
  "AtomicNumber",
  "Atomic Number",
  Hold[atomTransform],
  "",
  "actinides case",
  "atomicNumber.json"
];
