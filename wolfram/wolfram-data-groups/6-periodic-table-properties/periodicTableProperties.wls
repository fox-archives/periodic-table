#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];


iterateAtomProperty[
  "block",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "group",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "period",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "series",
  Unevaluated[atomTransformFixUnknowns]
];
