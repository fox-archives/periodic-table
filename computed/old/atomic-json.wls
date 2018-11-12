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
	electronConfigurationString = toHTMLSuperScript[i, "ElectronConfigurationString"];
	electronShellConfiguration = ElementData[i, "ElectronShellConfiguration"];
	ionizationEnergies = customFunction[i, "IonizationEnergies"];
	(* ionizationEnergies = ElementData[i, "IonizationEnergies"]; *)
	(* quantumNumbers = ElementData[i, "QuantumNumbers"]; *)
	vanDerWaalsRadius = ElementData[i, "VanDerWaalsRadius"];

	(* Format all Properties *)
	atomicRadius = transformProperty[atomicRadius];
	covalentRadius = transformProperty[covalentRadius];
	electronConfiguration = objectToObject[electronConfiguration];
	(*  electronConfigurationString *)
	electronShellConfiguration = objectToObject[electronShellConfiguration];
	(* ionizationEnergies = objectToObject[ionizationEnergies]; *)
	(* quantumNumbers = toHTMLSuperScript[i]; *)
	vanDerWaalsRadius = transformProperty[vanDerWaalsRadius];
	
	newElement = {
		"atomicRadius" -> atomicRadius,
		"covalentRadius" -> covalentRadius,
		"electronConfiguration" -> electronConfiguration,
		"electronConfigurationString" -> electronConfigurationString,
		"electronShellConfiguration" -> electronShellConfiguration,
		"ionizationEnergies" -> ionizationEnergies,
		(* quantumNumbers *)
		"vanDerWaalsRadius" -> vanDerWaalsRadius
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["atomic.json", periodicTable, "JSON"];






