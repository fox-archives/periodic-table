#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "mass magnetic susceptibility",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
