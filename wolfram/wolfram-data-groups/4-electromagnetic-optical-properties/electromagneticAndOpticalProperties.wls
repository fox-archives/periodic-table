#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "color",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "electrical conductivity",
  Unevaluated[atomTransformFixUnknowns]
];

electricalTypeAtomTransform[prop_, name_] := (
  If[StringContainsQ[ToString@prop, "EntityClass[Element, "],
    Return@fixEntityClass[prop],
    Return@fixUnknowns[prop];
  ];
);
iterateAtomProperty[
  "electrical type",
  Unevaluated[electricalTypeAtomTransform]
];

iterateAtomProperty[
  "mass magnetic susceptibility",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "molar magnetic susceptibility",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "refractive index",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "resistivity",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "volume magnetic susceptibility",
  Unevaluated[atomTransformFixUnknownsWithN]
];
