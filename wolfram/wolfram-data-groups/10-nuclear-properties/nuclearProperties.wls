#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "decay mode",
  Unevaluated[atomTransformFixUnknowns]
];

iterateAtomProperty[
  "isotope abundances",
  Unevaluated[atomTransformFixUnknowns]
];

(* iterateAtomProperty[
  "isotope half lives",
  Unevaluated[atomTransform]
]; *)

(* iterateAtomProperty[
  "isotope lifetimes",
  Unevaluated[atomTransform]
]; *)

iterateAtomProperty[
  "known isotopes",
  Unevaluated[atomTransformFixUnknowns]
];

(* iterateAtomProperty[
  "molar radioactivity",
  Unevaluated[atomTransform]
]; *)

(* iterateAtomProperty[
  "neutron cross section",
  Unevaluated[atomTransformFixUnknowns]
]; *)

iterateAtomProperty[
  "neutron mass absorption",
  Unevaluated[atomTransformFixUnknowns]
];

(* iterateAtomProperty[
  "specific radioactivity",
  Unevaluated[atomTransform]
]; *)

stableIsotopesAtomTransformMap[e_] := (
  Return@fixUnknowns@N[e];
);
stableIsotopesAtomTransform[prop_, name_] := (
  Return@Map[stableIsotopesAtomTransformMap, prop];
);
iterateAtomProperty[
  "stable isotopes",
  Unevaluated[stableIsotopesAtomTransform]
];
