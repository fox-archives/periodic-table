#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "block",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "group",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "period",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "series",
  Unevaluated[atomTransform]
];
