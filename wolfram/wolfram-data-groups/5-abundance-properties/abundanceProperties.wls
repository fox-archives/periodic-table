#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "crust abundance",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "human abundance",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "meteorite abundance",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "ocean abundance",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "solar abundance",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "universe abundance",
  Unevaluated[atomTransformFixUnknowns]
];
