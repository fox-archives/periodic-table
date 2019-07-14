#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["../common-methods.wls"];
DeleteFile["atomTabProperties.json"];

periodicTable = {};
	
Do[
	(* START MATERIAL-JSON.WLS *)
	brinelHardness = ElementData[i, "BrinellHardness"];
	bulkModulus = ElementData[i, "BulkModulus"];
	density = ElementData[i, "Density"];
	liquidDensity = ElementData[i, "LiquidDensity"];
	mohsHardness = ElementData[i, "MohsHardness"];
	molarVolume = ElementData[i, "MolarVolume"];
	poissonRatio = ElementData[i, "PoissonRatio"];
	shearModulus = ElementData[i, "ShearModulus"];
	soundSpeed = ElementData[i, "SoundSpeed"];
	thermalConductivity = ElementData[i, "ThermalConductivity"];
	thermalExpansion = ElementData[i, "ThermalExpansion"];
	vickersHardness = ElementData[i, "VickersHardness"];
	youngModulus = ElementData[i, "YoungModulus"];
	
	(* Format all Properties *)
	brinelHardness = transformProperty[brinelHardness];
	bulkModulus = transformProperty[bulkModulus];
	density = transformProperty[density];
	liquidDensity = transformProperty[liquidDensity];
	mohsHardness = transformProperty[mohsHardness];
	molarVolume = transformProperty[molarVolume];
	poissonRatio = transformProperty[poissonRatio];
	shearModulus = transformProperty[shearModulus];
	soundSpeed = transformProperty[soundSpeed];
	thermalConductivity = transformProperty[thermalConductivity];
	thermalExpansion = transformProperty[thermalExpansion];
	vickersHardness = transformProperty[vickersHardness];
	youngModulus = transformProperty[youngModulus];
	(* END MATERIAL-JSON.WLS *)
	
	
	(* START THERMODYNAMIC-JSON.WLS *)
	absoluteBoilingPoint = ElementData[i, "AbsoluteBoilingPoint"];
	absoluteMeltingPoint = ElementData[i, "AbsoluteMeltingPoint"];
	adiabaticIndex = ElementData[i, "AdiabaticIndex"]; (* Not included in output *)
	criticalPressure = ElementData[i, "CriticalPressure"];
	criticalTemperature = ElementData[i, "CriticalTemperature"];
	curiePoint = ElementData[i, "CuriePoint"]; (* Not included in output *)
	fusionHeat = ElementData[i, "FusionHeat"];
	neelPoint = ElementData[i, "NeelPoint"]; (* Not included in output *)
	phase = ElementData[i, "Phase"];
	specificHeat = ElementData[i, "SpecificHeat"];
	superconductingPoint = ElementData[i, "SuperconductingPoint"]; (* Not included in output *)
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
	(* END THERMODYNAMIC-JSON.WLS *)


	(* START ELECTROMAGNETIC-OPTICAL-JSON.WLS *)
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
	(* END ELECTROMAGNETIC-OPTICAL-JSON.WLS *)
	
	(* START BASIC-CHEMICAL.WLS AKA ABUNDANCE AND BASIC-CHEMICAL DATA *)
	electronAffinity = ElementData[i, "ElectronAffinity"];
	electronegativity = ElementData[i, "Electronegativity"];
	gasAtomicMultiplicities = ElementData[i, "GasAtomicMultiplicities"];
	valence = ElementData[i, "Valence"];
	crustAbundance = ElementData[i, "CrustAbundance"];
	humanAbundance = ElementData[i, "HumanAbundance"];
	meteoriteAbundance = ElementData[i, "MeteoriteAbundance"];
	oceanAbundance = ElementData[i, "OceanAbundance"];
	solarAbundance = ElementData[i, "SolarAbundance"];
	universeAbundance = ElementData[i, "UniverseAbundance"];
	
	(* Format all Properties *)
	electronAffinity = transformProperty[electronAffinity];
	electronegativity = transformProperty[electronegativity];
	gasAtomicMultiplicities = transformProperty[gasAtomicMultiplicities];
	valence = transformProperty[valence];
	crustAbundance = transformProperty[crustAbundance];
	humanAbundance = transformProperty[humanAbundance];
	meteoriteAbundance = transformProperty[meteoriteAbundance];
	oceanAbundance = transformProperty[oceanAbundance];
	solarAbundance = transformProperty[solarAbundance];
	universeAbundance = transformProperty[universeAbundance];
	(* END BASIC-CHEMICAL.WLS AKA ABUNDANCE AND BASIC-CHEMICAL DATA *)
	
	
	(* START ATOMIC-JSON.WLS *)
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
	(* END ATOMIC-JSON.WLS *)
	
	
	newElement = {
		(* START MATERIAL-JSON.WLS *)
		"brinelHardness" -> brinelHardness,
		"bulkModulus" -> bulkModulus,
		"density" -> density,
		"liquidDensity" -> liquidDensity,
		"mohsHardness" -> mohsHardness,
		"molarVolume" -> molarVolume,
		"poissonRatio" -> poissonRatio,
		"shearModulus" -> shearModulus,
		"soundSpeed" -> soundSpeed,
		"thermalConductivity" -> thermalConductivity,
		"thermalExpansion" -> thermalExpansion,
		"vickersHardness" -> vickersHardness, (* Probably Don't need this *)
		"youngModulus" -> youngModulus,
		(* END MATERIAL-JSON.WLS *)
		
		
		(* START THERMODYNAMIC-JSON.WLS *)
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
		"vaporizationHeat" -> vaporizationHeat,
		(* END THERMODYNAMIC-JSON.WLS *)
		
		
		(* START ELECTROMAGNETIC-OPTICAL-JSON.WLS *)
		"color" -> color, (* Prob don't need this *)
		"electricalConductivity" -> electricalConductivity,
		"electricalType" -> electricalType, (* Prob don't need this *)
		"magneticType" -> magneticType, (* Maybe don't need this *)
		"massMagneticSusceptibility" -> massMagneticSusceptibility,
		"molarMagneticSusceptibility" -> molarMagneticSusceptibility,
		(* RefractiveIndex *)
		"resistivity" -> resistivity,
		"volumeMagneticSusceptibility" -> volumeMagneticSusceptibility,
		(* END ELECTROMAGNETIC-OPTICAL-JSON.WLS *)
		
		
		(* START BASIC-CHEMICAL.WLS AKA ABUNDANCE AND BASIC-CHEMICAL DATA *)
		(* AllotropicMultiplicities *)
		(* CommonCompoundNames *)
		"electronAffinity" -> electronAffinity,
		"electronegativity" -> electronegativity,
		"gasAtomicMultiplicities" -> gasAtomicMultiplicities,
		"valence" -> valence,
		"crustAbundance" -> crustAbundance,
		"humanAbundance" -> humanAbundance,
		"meteoriteAbundance" -> meteoriteAbundance,
		"oceanAbundance" -> oceanAbundance,
		"solarAbundance" -> solarAbundance,
		"universeAbundance" -> universeAbundance,
		(* END BASIC-CHEMICAL.WLS AKA ABUNDANCE AND BASIC-CHEMICAL DATA *)
		
		(* START ATOMIC-JSON.WLS *)
		"atomicRadius" -> atomicRadius,
		"covalentRadius" -> covalentRadius,
		"electronConfiguration" -> electronConfiguration,
		"electronConfigurationString" -> electronConfigurationString,
		"electronShellConfiguration" -> electronShellConfiguration,
		"ionizationEnergies" -> ionizationEnergies,
		(* quantumNumbers *)
		"vanDerWaalsRadius" -> vanDerWaalsRadius
		(* END ATOMIC-JSON.WLS *)
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["atomTabProperties.json", periodicTable, "JSON"];
