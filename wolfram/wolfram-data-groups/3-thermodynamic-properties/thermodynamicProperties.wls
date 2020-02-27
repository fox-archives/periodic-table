#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "absolute boiling point",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "absolute melting point",
  Unevaluated[atomTransformFixUnknownsWithN]
];

(* stupid hack to make numbers 'look' better (no long decimals) *)
adiabaticIndexAtomTransform[prop_, name_] := (
  If[
    IntegerQ[prop * 10],
    Return[prop],
    Return@fixUnknowns@N[prop, 6];
  ];
);
iterateAtomProperty[
  "adiabatic index",
  Unevaluated[adiabaticIndexAtomTransform]
];

iterateAtomProperty[
  "boiling point",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "critical pressure",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "critical temperature",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "curie point",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "fusion heat",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "melting point",
  Unevaluated[atomTransformFixUnknownsWithN]
];

neelPointLowerBound[prop_] := (
  Return@fixUnknowns@N@Min@ElementData[i, atomPropertyPascalCase, "Interval"];
);
neelPointUpperBound[prop_] := (
  Return@fixUnknowns@N@Max@ElementData[i, atomPropertyPascalCase, "Interval"];
);
iterateAtomProperty[
  "neel point",
  Unevaluated[atomTransformFixUnknownsWithN],
  Unevaluated[neelPointLowerBound],
  Unevaluated[neelPointUpperBound]
];

phaseAtomTransform[prop_, name_] := (
  If[StringContainsQ[ToString@prop, "EntityClass[Element, "],
    Return@fixEntityClass[prop],
    Return@fixUnknowns[prop];
  ];
);
iterateAtomProperty[
  "phase",
  Unevaluated[phaseAtomTransform]
];

iterateAtomProperty[
  "specific heat",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "superconducting point",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "vaporization heat",
  Unevaluated[atomTransformFixUnknownsWithN]
];
