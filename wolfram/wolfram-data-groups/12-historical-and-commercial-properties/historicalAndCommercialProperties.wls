#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

discoveryContriesAtomTransformMap[e_] := (
  Return@fixUnknowns@fixEntityCountry@ToString@N[e];
);
discoveryCountriesAtomTransform[prop_] := (
  Return@Map[discoveryContriesAtomTransformMap, prop];
);
iterateAtomProperty[
  "discovery countries",
  Unevaluated[discoveryCountriesAtomTransform]
];

discoveryYearAtomTransform[prop_] := (
  Return@fixUnknowns@ToExpression@fixDateObject[prop];
);
iterateAtomProperty[
  "discovery year",
  Unevaluated[discoveryYearAtomTransform]
];
