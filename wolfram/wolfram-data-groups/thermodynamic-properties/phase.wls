#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@ToString[prop];
);

iterateAtomProperty[
  "phase",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
