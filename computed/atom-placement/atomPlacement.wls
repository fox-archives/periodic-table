#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../common-methods.wls"];
DeleteFile["atomPlacement.json"];
periodicTable = {};

reformatGroup[value_, i_]:=
	If[MissingQ[value],
		Return["g-0"];,
		(* If MissingQ is false *)
		Return["g-" <> ToString[value]];
	];
	
reformatPeriod[value_, i_]:=
	If[MissingQ[value],
		Return["p-0"];,
		(* If MissingQ is false *)
		Return["p-" <> ToString[value]];
	];
	
reformatColumn[value_, i_]:=
	Which[
		(* Give element regular value, if get regular value from ElementData *)
		MissingQ[value] == False,
			Return["c-" <> ToString[value * 2]];,
		(* Artifically give element column if it is in the f-block, or an Ant. / Lanth., when get weird values from ElementData *)
		MissingQ[value] == True && 57 <= i && i <= 71,
			Return["c-" <> ToString[2*(i - 54)]];,
		MissingQ[value] == True && 89 <= i && i <= 103,
			Return["c-" <> ToString[2*(i - 86)]];,
		True,
			Return["Unexected Values"];
	];
	
reformatRow[value_, i_]:=
	Which[
	57 <= i && i <= 71,
		Return["r-17"];,
	89 <= i && i <= 103,
		Return["r-19"];,
	True,
		Return["r-" <> ToString[value * 2]];
	];
	

For[i = 1, i < 119, i++,
	Group = reformatGroup[ElementData[i, "Group"], i];
	Period = reformatPeriod[ElementData[i, "Period"], i];
	Column1 = reformatColumn[ElementData[i, "Group"], i];
	Row1 = reformatRow[ElementData[i, "Period"], i];
	
	
	newElement = {
		(* Show ith element I for debugging *)
		(*"i" -> i,*)
		"group" -> Group,
		"period" -> Period,
		"column" -> Column1,
		"row" -> Row1
	};
	
	periodicTable = Append[periodicTable, newElement];
	
	(* Case for Lanthanites *)
	If[i == 56,
		lanth = {
			"group" -> "g-0",
			"period" -> "p-0",
			"column" -> "c-6",
			"row" -> "r-12"
		};
		periodicTable = Append[periodicTable, lanth];
	];
	
	(* Case for Actinides *)
	If[i == 88,
		act = {
			"group" -> "g-0",
			"period" -> "p-0",
			"column" -> "c-6",
			"row" -> "r-14"
		};
		periodicTable = Append[periodicTable, act];
	];
];

Export["atomPlacement.json", periodicTable, "JSON"];
