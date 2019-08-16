#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return[N@prop];
);

iterateAtomProperty[
  "neutron mass absorption",
  Unevaluated[atomTransform],
  "lanthanites case",
  "actinides case"
];
