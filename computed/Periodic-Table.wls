#!/usr/bin/env wolframscript
(* ::Package:: *)

SetDirectory["/Users/edwin/Documents/All/MathematicaScript/"]
DeleteFile["periodic-table.json"]

periodicTable = {};
Do[
	discoveryDate = DateString[ElementData[i, "DiscoveryYear"], "Year"];
	(*discoveredBy = ElementData[i, "DiscoveryCountries"];*)
	Print[discoveredBy];
	newElement = {
		"eLabel" -> i,
		"discoveryDate" -> discoveryDate
		(*"discoveredBy" \[Rule] discoveredBy*)
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 56}]

Export["periodic-table.json", periodicTable, "JSON"(*, "Compact" \[Rule] True*)];


\[AliasDelimiter]
