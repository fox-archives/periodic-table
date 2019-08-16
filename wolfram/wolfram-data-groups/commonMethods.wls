#!/usr/bin/env wolframscript
(* ::Package:: *)

FixValue[data_]:= (
  If[NumberQ[data],
    Return[data];
  ];

  Return["Error"];
);

FixUnit[data_]:= (
  If[KnownUnitQ[data],
    Return[data];
  ];

  Return["Error"];
);

FixAccuracyPrecision[data_]:= (
  If[NumberQ[data],
    Return[data];
  ];
  
  Return["Infinity"];
);

RemoveUnknowns[data_]:= (
  If[FailureQ[data],
    Return["Failed"];
  ];
  
  If[MissingQ[data],
    Return["Unknown"];
  ];

  Return[data];
);

(*
  atomProperty
    name of the property,
  atomValueTransformation
    function to transform the actual value of the property (we are trying to extract)
  lanthanitesCase
    special case value for lanthanites block
  actinidesCase
    spacial case value for actinites block
*)
IterateAtomProperty[
  atomProperty_,
  atomValueTransformation_,
  lanthanitesCase_,
  actinidesCase_
]:= (
  (* AtomProperty *)
  atomPropertyPascalCase = StringDelete[StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]], " "];
  (* Atom Property *)
  atomPropertyPascalCaseWithSpace = StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]];

  atomArrayData = {};
  For[i = 1, i < 119, i++, (
    (* General Case *)
    val = ElementData[i, atomPropertyPascalCase];
    value = atomValueTransformation @* RemoveUnknowns @* val;
    Print @* FixValue @* QuantityMagnitude @* value;
    Print @* FixAccuracyPrecision @* Accuracy @* val;

    atomArrayData = Append[atomArrayData, {
      "name" -> ElementData[i, "StandardName"],
      "value" -> FixValue @* QuantityMagnitude @* value,
      "accuracy" -> FixAccuracyPrecision @* Accuracy @* val,
      "transformedAccuracy" -> FixAccuracyPrecision @* Accuracy @* value,
      "precision" -> FixAccuracyPrecision @* Precision @* val,
      "transformedPrecision" -> FixAccuracyPrecision @* Precision @* value,
      "unit" -> FixUnit @* QuantityUnit @* value
    }];

    (* Lanthanites Case *)
    If[i == 56,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Lanthanites",
        "value" -> lanthanitesCase
      }];
    ];

    (* Actinides Case *)
    If[i == 88,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Actinides",
        "value" -> actinidesCase
      }];
    ];
  )];

  genericValue = atomValueTransformation @* RemoveUnknowns @* ElementData[1, atomPropertyPascalCase];
  genericUnit = FixUnit @* QuantityUnit @* genericValue;

  rootData = {
    "meta" -> {
      "atomPropertyName" -> atomPropertyPascalCase,
      "atomPropertyNameWithSpace" -> atomPropertyPascalCaseWithSpace,
      "atomPropertyValueUnit" -> genericUnit
    },
    "data" -> atomArrayData
  };

  jsonFile = StringReplace[atomProperty, (" " ~~ WordBoundary) ~~ x_ :> ToUpperCase[x]] ~~ ".json";
  Export[jsonFile, rootData, "JSON"];

  Print[jsonFile <> " done"];
);
