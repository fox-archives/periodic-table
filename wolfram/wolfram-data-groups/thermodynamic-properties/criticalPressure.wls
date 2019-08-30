#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "critical pressure",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
