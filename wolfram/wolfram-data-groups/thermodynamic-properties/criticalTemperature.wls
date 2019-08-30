#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "critical temperature",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
