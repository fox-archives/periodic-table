#!/usr/bin/env wolframscript
(* ::Package:: *)

SetDirectory["/Users/edwin/Documents/All/MathematicaScript/"]
DeleteFile["simple.json"]

(* Prevents the return of units *)
SetSystemOptions["DataOptions" -> "ReturnQuantities" -> False];
periodicTable = {};

Do[
	name = ElementData[i, "StandardName"];
	abbreviation = ElementData[i, "Abbreviation"];
	block = ElementData[i, "Block"];
	atomicWeight = ToString[QuantityMagnitude @ ElementData[i, "AtomicWeight"]];
	meltingPoint = ElementData[i, "AbsoluteMeltingPoint"];
	boilingPoint = ElementData[i, "AbsoluteBoilingPoint"];
	
	(* FORMAT ATOMICWEIGHT ACCORDINGLY *)
	(* StringEndsQ returns true or false, depending on if "." is the last letter in atomicWeight *)
	If[StringEndsQ[atomicWeight, "."],
		(* Converts atomicWeight to number only, removing "." *)
		atomicWeight = StringReplace[atomicWeight, "." -> ""];
		(* Adds Parenthesis to atomicWeight, indicating there is no stable isotope *)
		atomicWeight = StringJoin["(", atomicWeight, ")"];
	];
	
	(* FORMAT MELTINGPOINT ACCORDINGLY *)
	stringifiedMeltingPoint = ToString[meltingPoint];
	If[stringifiedMeltingPoint == "Missing[NotAvailable]" ||
		stringifiedMeltingPoint == "Missing[Unknown]",
		
		meltingPoint = "Unknown";
	];
	If[stringifiedMeltingPoint == "Missing[NotApplicable]",
		meltingPoint = "N / A";
	];
	If[StringEndsQ[stringifiedMeltingPoint, "."],
		meltingPoint = StringReplace[stringifiedMeltingPoint, "." -> ""];
	];
	Print[meltingPoint];
	If[NumberQ[meltingPoint],
		Print[DecimalForm[meltingPoint]]
	];
	
	newElement = {
		"eLabel" -> i,
		"name" -> name,
		"abbreviation" -> abbreviation,
		"block" -> block,
		"atomicMass" -> atomicWeight,
		"meltingPoint" -> meltingPoint
		(*"boilingPoint" -> boilingPoint*)
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["simple.json", periodicTable, "JSON"(*, "Compact" \[Rule] True*)];









