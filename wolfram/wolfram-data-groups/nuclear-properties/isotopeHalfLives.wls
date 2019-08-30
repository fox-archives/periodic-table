#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "isotope half lives",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
