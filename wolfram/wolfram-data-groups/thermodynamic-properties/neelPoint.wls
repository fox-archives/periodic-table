#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "neel point",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
