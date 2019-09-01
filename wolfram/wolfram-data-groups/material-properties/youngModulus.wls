#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@N@fixUnknowns[prop];
);

iterateAtomProperty[
  "young modulus",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
