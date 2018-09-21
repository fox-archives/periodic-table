#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["all.json"];

periodicTable = {};
	
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
		"label" -> i,
		"name" -> name,
		"abbreviation" -> abbreviation,
		"block" -> block,
		"atomicMass" -> atomicWeight
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["all.json", periodicTable, "JSON"(*, "Compact" \[Rule] True*)];
