#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "discovery countries",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "discovery year",
  Unevaluated[atomTransform]
];
