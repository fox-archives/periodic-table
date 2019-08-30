#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "density",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
