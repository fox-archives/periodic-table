#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "abbreviation",
  Unevaluated[atomTransformFixUnknownsWithN]
];

allotripeNamesAtomTransform[prop_, name_] := (
  Return[prop];
);
iterateAtomProperty[
  "allotrope names",
  Unevaluated[allotripeNamesAtomTransform]
];

alternateNamesAtomTransform[prop_, name_] := (
  Return[prop];
);
iterateAtomProperty[
  "alternate names",
  Unevaluated[alternateNamesAtomTransform]
];

iterateAtomProperty[
  "c a s number",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iconColorAtomTransform[prop_, name_] := (
  Return[List @@ prop];
);
iterateAtomProperty[
  "icon color",
  Unevaluated[iconColorAtomTransform]
];

iterateAtomProperty[
  "name",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "standard name",
  Unevaluated[atomTransformFixUnknownsWithN]
];
