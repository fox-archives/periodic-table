#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "mass magnetic susceptibility",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
