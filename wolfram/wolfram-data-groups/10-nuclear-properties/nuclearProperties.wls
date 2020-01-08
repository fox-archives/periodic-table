#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

iterateAtomProperty[
  "decay mode",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "isotope abundances",
  Unevaluated[atomTransform]
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
  Unevaluated[atomTransform]
];

(* iterateAtomProperty[
  "molar radioactivity",
  Unevaluated[atomTransform]
]; *)

iterateAtomProperty[
  "neutron cross section",
  Unevaluated[atomTransform]
];

iterateAtomProperty[
  "neutron mass absorption",
  Unevaluated[atomTransform]
];

(* iterateAtomProperty[
  "specific radioactivity",
  Unevaluated[atomTransform]
]; *)

iterateAtomProperty[
  "stable isotopes",
  Unevaluated[atomTransform]
];
