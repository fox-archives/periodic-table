#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../commonMethods.wls"];

iterateAtomProperty[
  "brinell hardness",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "bulk modulus",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "density",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "mohs hardness",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "molar volume",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "poisson ratio",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "shear modulus",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "sound speed",
  Unevaluated[atomTransformFixUnknownsWithN]
];

thermalConductivityAtomTransform[prop_, name_] := (
  If[
    MemberQ[{
      "Krypton"
    }, name],
    Return@fixUnknowns[prop],
    Return@fixUnknowns@N[prop]
  ];
);
iterateAtomProperty[
  "thermal conductivity",
  Unevaluated[thermalConductivityAtomTransform]
];

thermalExpansionAtomTransform[prop_, name_] := (
  If[
    MemberQ[{
      "Boron", "Germanium"
    }, name],
    Return@fixUnknowns@Round[prop, 0.00000001],
    Return@fixUnknowns[prop]
  ];
);
iterateAtomProperty[
  "thermal expansion",
  Unevaluated[thermalExpansionAtomTransform]
];

iterateAtomProperty[
  "vickers hardness",
  Unevaluated[atomTransformFixUnknownsWithN]
];

iterateAtomProperty[
  "young modulus",
  Unevaluated[atomTransformFixUnknownsWithN]
];
