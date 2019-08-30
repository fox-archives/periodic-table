#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "magnetic type",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
