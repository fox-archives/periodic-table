#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

iterateAtomProperty[
  "human abundance",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
