#!/usr/bin/env wolframscript
(* ::Package:: *)

SetDirectory["/Users/edwin/Documents/All/Programs/periodic-table/computed/"]
DeleteFile["simple.json"]
(* Prevents the return of units *)
SetSystemOptions["DataOptions" -> "ReturnQuantities" -> False];
periodicTable = {};

(* SETTING UP COMMON FUNCTIONS *)
removeEndingPeriod[str_]:=
	If[StringEndsQ[str, "."],
		newStr = StringTake[str, StringLength[str] - 1];
		Return[newStr];,
		(* Else *)
		Return[str];
	];
	
(* Replaces the stringified version of the error / no data message with a human readable one *)
convertToUnknownNA[str_]:=
	If[str == "Missing[NotAvailable]" ||
		str == "Missing[Unknown]",
		
		Return["Unknown"];,
		(* Else *)
		If[str == "Missing[NotApplicable]",
			Return["N / A"];,
			
			(* Else *)
			Return[str];
		];
	];
	
	
scientificToRegular[num_]:=
	If[NumberQ[num],
		Return[N[num]];,
		(* Else *)
		Return[num];
	];
	
Do[
	name = ElementData[i, "StandardName"];
	abbreviation = ElementData[i, "Abbreviation"];
	block = ElementData[i, "Block"];
	atomicWeight = ElementData[i, "AtomicWeight"];
	meltingPoint = ElementData[i, "AbsoluteMeltingPoint"];
	boilingPoint = ElementData[i, "AbsoluteBoilingPoint"];
	
	(* FORMAT ATOMICWEIGHT ACCORDINGLY *)
	atomicWeight = ToString[atomicWeight];
	atomicWeight = removeEndingPeriod[atomicWeight];
	
	(* FORMAT MELTINGPOINT ACCORDINGLY *)
	meltingPoint = scientificToRegular[meltingPoint];
	meltingPoint = ToString[meltingPoint];
	meltingPoint = convertToUnknownNA[meltingPoint];
	meltingPoint = removeEndingPeriod[meltingPoint];
	
	(* FORMAT BOILINGPOINT ACCORDINGLY *)
	boilingPoint = scientificToRegular[boilingPoint];
	boilingPoint = ToString[boilingPoint];
	boilingPoint = convertToUnknownNA[boilingPoint];
	boilingPoint = removeEndingPeriod[boilingPoint];
	
	newElement = {
		"eLabel" -> i,
		"name" -> name,
		"abbreviation" -> abbreviation,
		"block" -> block,
		"atomicMass" -> atomicWeight,
		"meltingPoint" -> meltingPoint,
		"boilingPoint" -> boilingPoint
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["simple.json", periodicTable, "JSON"(*, "Compact" \[Rule] True*)];












