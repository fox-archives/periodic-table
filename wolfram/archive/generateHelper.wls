#!/usr/bin/env wolframscript
(* ::Package:: *)

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


constructAtom[atomPropertyPascalCase_] := (
  If[i == 56,
    Return[{
      "name" -> "Lanthanites",
      "value" -> "lanthanites case"
    }];
  ];

  If[i == 88,
    Return[{
      "name" -> "Actinides",
      "value" -> "actinides case"
    }];
  ];

  Return[{
    "name" -> ElementData[i, "StandardName"],
    "value" -> atomTransform@ElementData[i, atomPropertyPascalCase]
  }];
);

generateGroupData[
  atomPropertiesGroup_,
  atomPropertiesAndTheirTransformationFunction_
] := (
  (* AtomProperty | Atom Property *)
  (* atomPropertyPascalCase = StringDelete[StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]], " "];
  atomPropertyPascalCaseWithSpace = StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]]; *)
  
  atomList = {};
  For[i = 1, i < 5, i++, (
    atom = <||>;

    (* construct an object `atom` using each property given *)
    For[j = 1, j <= Length[atomPropertiesAndTheirTransformationFunction], j++, (
      propertyName = atomPropertiesAndTheirTransformationFunction[[j]][[1]];
      propertyTransformer = atomPropertiesAndTheirTransformationFunction[[j]][[2]];
      propertyValue = propertyTransformer@ElementData[i, propertyName];

      (* add property to atom object (association) *)
      AssociateTo[atom, <|
        propertyName -> propertyValue
      |>];
    )];

    Print[atom];
    Append[atomList, atom];
  )];

  Print[atomList];

  (* rootData = {
    "meta" -> {
      "atomPropertyName" -> atomPropertyPascalCase,
      "atomPropertyNameWithSpace" -> atomPropertyPascalCaseWithSpace,
      "description" -> ElementData[1, atomPropertyPascalCase, "Description"],
      "longDescription" -> ElementData[1, atomPropertyPascalCase, "LongDescription"]
      (* "unit" -> unitMappingsData[["mappings"]][[ToString@ElementData[1, atomPropertyPascalCase, "Units"]]][["short"]], *)
      (* "unitLong" -> unitMappingsData[["mappings"]][[ToString@ElementData[1, atomPropertyPascalCase, "Units"]]][["long"]] *)
      (* "missingCount" -> Count[atomsUnitData, _Missing] *)
    },
    "data" -> atomArrayData
  };

  jsonFile = StringReplace[atomProperty, (" " ~~ WordBoundary) ~~ x_ :> ToUpperCase[x]] ~~ ".json";
  Export[jsonFile, rootData, "JSON"];

  Print[jsonFile <> " done"]; *)
);
