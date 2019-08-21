#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

iterateAtomProperty[
  "solar abundance",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
