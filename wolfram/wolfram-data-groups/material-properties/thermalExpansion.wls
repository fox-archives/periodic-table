#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns@N[prop];
);

iterateAtomProperty[
  "thermal expansion",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
