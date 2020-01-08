#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "crust abundance",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "human abundance",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "meteorite abundance",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "ocean abundance",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "solar abundance",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "universe abundance",
  Unevaluated[atomTransform]
];
