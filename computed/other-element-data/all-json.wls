#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["json/all.json"];

periodicTable = {};
	
Do[
	name = ElementData[i, "StandardName"];
	abbreviation = ElementData[i, "Abbreviation"];
	block = ElementData[i, "Block"];
	atomicWeight = ElementData[i, "AtomicWeight"];
	
	(* FORMAT ATOMICWEIGHT ACCORDINGLY *)
	(* atomicWeight = ToString[atomicWeight];
	atomicWeight = removeEndingPeriod[atomicWeight]; *)
	atomicWeight = transformProperty[atomicWeight];
	
	newElement = {
		"label" -> i,
		"name" -> name,
		"abbreviation" -> abbreviation,
		"block" -> block,
		"atomicMass" -> atomicWeight
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["json/all.json", periodicTable, "JSON"(*, "Compact" \[Rule] True*)];
