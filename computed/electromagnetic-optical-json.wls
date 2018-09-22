#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["electromagnetic-optical.json"];

periodicTable = {};
	 
Do[
	color = ElementData[i, "Color"];
	electricalConductivity = ElementData[i, "ElectricalConductivity"];
	electricalType = ElementData[i, "ElectricalType"];
	magneticType = ElementData[i, "MagneticType"];
	massMagneticSusceptibility = ElementData[i, "MassMagneticSusceptibility"];
	molarMagneticSusceptibility = ElementData[i, "MolarMagneticSusceptibility"];
	refractiveIndex = ElementData[i, "RefractiveIndex"];
	resistivity = ElementData[i, "Resistivity"];
	volumeMagneticSusceptibility = ElementData[i, "VolumeMagneticSusceptibility"];
	
	
	(* Format all Properties *)
	color = transformProperty[color];
	electricalConductivity = transformProperty[electricalConductivity];
	electricalType = transformProperty[electricalType];
	magneticType = transformProperty[magneticType];
	massMagneticSusceptibility = transformProperty[massMagneticSusceptibility];
	molarMagneticSusceptibility = transformProperty[molarMagneticSusceptibility];
	refractiveIndex = transformProperty[refractiveIndex];
	resistivity = transformProperty[resistivity];
	volumeMagneticSusceptibility = transformProperty[volumeMagneticSusceptibility];
	
	newElement = {
		"color" -> color,
		"electricalConductivity" -> electricalConductivity,
		"electricalType" -> electricalType,
		"magneticType" -> magneticType,
		"massMagneticSusceptibility" -> massMagneticSusceptibility,
		"molarMagneticSusceptibility" -> molarMagneticSusceptibility,
		(* RefractiveIndex *)
		"resistivity" -> resistivity,
		"volumeMagneticSusceptibility" -> volumeMagneticSusceptibility

	
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["electromagnetic-optical.json", periodicTable, "JSON"];
