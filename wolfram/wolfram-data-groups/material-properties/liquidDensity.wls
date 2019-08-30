#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "liquid density",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
