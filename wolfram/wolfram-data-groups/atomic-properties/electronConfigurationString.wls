#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[prop];
);

iterateAtomProperty[
  "electron configuration string",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
