#!/usr/bin/env wolframscript
(* ::Package:: *)


(*
  import unit metadata once
*)
unitMappingsData = Import["unitMappings.json", "RawJSON"];


(*
  data
    data to return some sort of string if it is a 'failure', 'missing', etc, 'object'
*)
fixUnknowns[data_] := (
  If[FailureQ[data],
    Return["Failed"];
  ];
  
  If[MissingQ[data],
    Return["Unknown"];
  ];

  If[NumberQ[QuantityMagnitude@data],
    Return[QuantityMagnitude@data];
  ];

  Return["Error"];
);


(*
  atomProperty
    name of the property,
  atomValueTransformation
    function to transform the actual value of the property that we are trying to extract
  lanthanitesCase
    special case value for lanthanites block
  actinidesCase
    spacial case value for actinites block
*)
iterateAtomProperty[
  atomProperty_,
  atomValueTransformation_,
  lanthanitesCase_:"lanthanites case",
  actinidesCase_:"actinides case"
] := (
  (* AtomProperty | Atom Property *)
  atomPropertyPascalCase = StringDelete[StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]], " "];
  atomPropertyPascalCaseWithSpace = StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]];
  
  atomArrayData = {};
  For[i = 1, i < 119, i++, (
    atomArrayData = Append[atomArrayData, {
      "name" -> ElementData[i, "StandardName"],
      "value" -> atomValueTransformation@ElementData[i, atomPropertyPascalCase]
    }];

    If[i == 56,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Lanthanites",
        "value" -> lanthanitesCase
      }];
    ];

    If[i == 88,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Actinides",
        "value" -> actinidesCase
      }];
    ];
  )];

  rootData = {
    "meta" -> {
      "atomPropertyName" -> atomPropertyPascalCase,
      "atomPropertyNameWithSpace" -> atomPropertyPascalCaseWithSpace,
      "description" -> ElementData[1, atomPropertyPascalCase, "Description"],
      "longDescription" -> ElementData[1, atomPropertyPascalCase, "LongDescription"],
      "unit" -> unitMappingsData[["mappings"]][[ToString@ElementData[1, atomPropertyPascalCase, "Units"]]][["short"]],
      "unitLong" -> unitMappingsData[["mappings"]][[ToString@ElementData[1, atomPropertyPascalCase, "Units"]]][["long"]]
      (* "missingCount" -> Count[atomsUnitData, _Missing] *)
    },
    "data" -> atomArrayData
  };

  jsonFile = StringReplace[atomProperty, (" " ~~ WordBoundary) ~~ x_ :> ToUpperCase[x]] ~~ ".json";
  Export[jsonFile, rootData, "JSON"];

  Print[jsonFile <> " done"];
);
