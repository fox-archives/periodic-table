#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "atomic number",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "atomic weight",
  Unevaluated[atomTransformFixUnknowns]
];
