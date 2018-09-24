#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["atomic.json"];

periodicTable = {};
	 
Do[
	atomicRadius = ElementData[i, "AtomicRadius"];
	covalentRadius = ElementData[i, "CovalentRadius"];
	electronConfiguration = ElementData[i, "ElectronConfiguration"];
	(* electronConfigurationString = ElementData[i, "ElectronConfigurationString"]; *)
	electronShellConfiguration = ElementData[i, "ElectronShellConfiguration"];
	ionizationEnergies = ElementData[i, "IonizationEnergies"];
	quantumNumbers = ElementData[i, "QuantumNumbers"];
	vanDerWaalsRadius = ElementData[i, "VanDerWaalsRadius"];

	(* Format all Properties *)
	atomicRadius = transformProperty[atomicRadius];
	covalentRadius = transformProperty[covalentRadius];
	electronConfiguration = objectToObject[electronConfiguration];
	electronConfigurationString = toHTMLSuperScript[];
	electronShellConfiguration = objectToObject[electronShellConfiguration];
	ionizationEnergies = objectToObject[ionizationEnergies];
	quantumNumbers = transformProperty[quantumNumbers];
	vanDerWaalsRadius = transformProperty[vanDerWaalsRadius];

	Print@electronConfigurationString;
	
	newElement = {
		"atomicRadius" -> atomicRadius,
		"covalentRadius" -> covalentRadius,
		"electronConfiguration" -> electronConfiguration,
		"electronConfigurationString" -> electronConfigurationString,
		"electronShellConfiguration" -> electronShellConfiguration,
		"ionizationEnergies" -> ionizationEnergies,
		"quantumNumbers" -> quantumNumbers,
		"vanDerWaalsRadius" -> vanDerWaalsRadius
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["atomic.json", periodicTable, "JSON"];



