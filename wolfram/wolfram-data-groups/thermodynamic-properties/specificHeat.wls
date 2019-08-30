#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "specific heat",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
