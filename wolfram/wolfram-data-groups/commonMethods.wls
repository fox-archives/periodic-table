#!/usr/bin/env wolframscript
(* ::Package:: *)


(*
  import unit metadata
*)
unitMappingsData = Import["unitMappings.json", "RawJSON"];



(*
  helper functions *for* *Properties.wls generation
*)

(* substrings out the "EntityClass[Element, " part *)
fixEntityClass[data_] := (
  Return@StringDrop[StringDrop[ToString@data, 21], -1];
);

(* substrings out Entity[Country, " part *)
fixEntityCountry[data_] := (
  Return@StringDrop[StringDrop[ToString@data, 16], -1];
);

(* substrings out DateObject[{ part *)
fixDateObject[data_] := (
  Return@StringDrop[StringDrop[ToString@data, 12], -24];
);

(* extract number and normalize *)
atomTransformFixUnknownsWithN[prop_, name_] := (
  Return@fixUnknowns@N[prop];
);

(* normalize *)
atomTransformFixUnknowns[prop_, name_] := (
  Return@fixUnknowns[prop];
);



(*
  general sanitize function *for* this file only
*)
sanitize[data_] := (
  If[FailureQ[data],
    Return["FailureQ"];
  ];
  
  If[MissingQ[data],
    Return["MissingQ"];
  ];

  Return@ToString[data];
);

lowerBoundDefault[prop_] := (
  Return@fixUnknowns@Min@ElementData[i, atomPropertyPascalCase, "Interval"]
);

upperBoundDefault[prop_] := (
  Return@fixUnknowns@Max@ElementData[i, atomPropertyPascalCase, "Interval"]
);



(*
  data
    data to return some sort of string if it is a 'failure', 'missing', etc, 'object'
*)
fixUnknowns[data_] := (
  If[FailureQ[data],
    Return["FailureQ"];
  ];
  
  If[MissingQ[data],
    Return["MissingQ"];
  ];

  If[NumberQ[QuantityMagnitude@data],
    Return[QuantityMagnitude@data];
  ];

  (* returning `ToString[data]` fixes 4-electromagnetic-optical-properties/color.json *)
  Return@ToString[data];
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
  atomLowerBoundTransformation_:lowerBoundDefault,
  atomUpperBoundTransformation_:upperBoundDefault
] := (
  (* AtomProperty | Atom Property | atomProperty *)
  atomPropertyPascalCase = StringDelete[StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]], " "];
  atomPropertyPascalCaseWithSpace = StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]];
  atomPropertyCamelCase = StringReplace[atomProperty, (" " ~~ WordBoundary) ~~ x_ :> ToUpperCase[x]];

  atomArrayData = {};
  For[i = 1, i < 119, i++, (
    atomStandardName = ElementData[i, "StandardName"];
    atomArrayData = Append[atomArrayData, {
      "name" -> atomStandardName,
      "value" -> atomValueTransformation[ElementData[i, atomPropertyPascalCase], atomStandardName],
      "lowerBound" -> atomLowerBoundTransformation@ElementData[i, atomPropertyPascalCase, "Interval"],
      "upperBound" -> atomUpperBoundTransformation@ElementData[i, atomPropertyPascalCase, "Interval"]
    }];

    If[i == 56,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Lanthanites",
        "value" -> ""
      }];
    ];

    If[i == 88,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Actinides",
        "value" -> ""
      }];
    ];
  )];

  rootData = {
    "meta" -> {
      "annotations" -> {
        "description" -> sanitize@ElementData[1, atomPropertyPascalCase, "Description"],
        "longDescription" -> sanitize@ElementData[1, atomPropertyPascalCase, "LongDescription"],
        "note" -> sanitize@ElementData[1, atomPropertyPascalCase, "Note"],
        "units" -> sanitize@ElementData[1, atomPropertyPascalCase, "Units"],
        "unitsName" -> sanitize@ElementData[1, atomPropertyPascalCase, "UnitsName"],
        "unitsNotation" -> sanitize@ElementData[1, atomPropertyPascalCase, "UnitsNotation"],
        "unitsStandardName" -> sanitize@ElementData[1, atomPropertyPascalCase, "UnitsStandardName"]
      },
      "atomPropertyName" -> atomPropertyPascalCase,
      "atomPropertyNameWithSpace" -> atomPropertyPascalCaseWithSpace,
      "atomPropertyNameCamelCase" -> atomPropertyCamelCase,
      "atomPropertyNameLowercaseWithSpace" -> atomProperty,
      "unit" -> sanitize@unitMappingsData[["mappings"]][[ToString@ElementData[1, atomPropertyPascalCase, "Units"]]][["short"]],
      "unitLong" -> sanitize@unitMappingsData[["mappings"]][[ToString@ElementData[1, atomPropertyPascalCase, "Units"]]][["long"]]
      (* "missingCount" -> Count[atomsUnitData, _Missing] *)
    },
    "data" -> atomArrayData
  };
  (* Print["rootData ", rootData]; *)

  jsonFile = atomPropertyCamelCase ~~ ".json";
  Export[jsonFile, rootData, "JSON"];
  Print[jsonFile <> " done"];
);
