#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["thermodynamic.json"];

periodicTable = {};
	 
Do[
	absoluteBoilingPoint = ElementData[i, "AbsoluteBoilingPoint"];
	absoluteMeltingPoint = ElementData[i, "AbsoluteMeltingPoint"];
	adiabaticIndex = ElementData[i, "AdiabaticIndex"]; (* Not included in output *)
	criticalPressure = ElementData[i, "CriticalPressure"];
	criticalTemperature = ElementData[i, "CriticalTemperature"];
	curiePoint = ElementData[i, "CuriePoint"]; (* Not included in output *)
	fusionHeat = ElementData[i, "FusionHeat"];
	neelPoint = ElementData[i, "NeelPoint"];
	phase = ElementData[i, "Phase"];
	specificHeat = ElementData[i, "SpecificHeat"];
	superconductingPoint = ElementData[i, "SuperconductingPoint"];
	vaporizationHeat = ElementData[i, "VaporizationHeat"];
	
	
	(* Format all Properties *)
	absoluteBoilingPoint = transformProperty[absoluteBoilingPoint];
	absoluteMeltingPoint = transformProperty[absoluteMeltingPoint];
	adiabaticIndex = transformProperty[adiabaticIndex];
	criticalPressure = transformProperty[criticalPressure];
	criticalTemperature = transformProperty[criticalTemperature];
	curiePoint = transformProperty[curiePoint];
	fusionHeat = transformProperty[fusionHeat];
	neelPoint = transformProperty[neelPoint];
	phase = transformProperty[phase];
	specificHeat = transformProperty[specificHeat];
	superconductingPoint = transformProperty[superconductingPoint];
	vaporizationHeat = transformProperty[vaporizationHeat];
	
	newElement = {
		"absoluteBoilingPoint" -> absoluteBoilingPoint,
		"absoluteMeltingPoint" -> absoluteMeltingPoint,
		(* abiabaticIndex *)
		"criticalPressure" -> criticalPressure,
		"criticalTemperature" -> criticalTemperature,
		(* curiePoint *)
		"fusionHeat" -> fusionHeat,
		(* neelPoint *)
		"phase" -> phase,
		"specificHeat" -> specificHeat,
		(* superConductingPoint *)
		"vaporizationHeat" -> vaporizationHeat
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["thermodynamic.json", periodicTable, "JSON"];
