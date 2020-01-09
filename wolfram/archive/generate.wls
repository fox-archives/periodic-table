#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["./generateHelper.wls"];

atomTransform[prop_]:= (
  Return@fixUnknowns[prop];
);

generateGroupData[
  "materialProperties",
  {
    {
      "BrinellHardness",
      atomTransform
    },
    {
      "BulkModulus",
      atomTransform
    },
    {
      "Density",
      atomTransform
    }
  }
];
