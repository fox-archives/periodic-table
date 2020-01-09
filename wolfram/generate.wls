#!/usr/bin/env wolframscript
(* ::Package:: *)

(*
  this script must be a wolfram file for optimal efficiency. for some reason,
  every time we execute the wolfram cli command to process a file, it takes
  a while to start up. by sourcing other files from a `single` file using
  the 'Import' function, we can effectively get rid of this huge delay
*)

sourceWolframScriptsFromSuchFolders[file_] := (
  SetDirectory[file];
  Print["GENERATING " <> ToUpperCase[file]];
  Scan[Import, Select[FileNames[], !StringFreeQ[#, ".wls"] &]];
  Print[""];
  SetDirectory[".."];
);
SetDirectory["wolfram-data-groups"];
Scan[sourceWolframScriptsFromSuchFolders, Sort@Select[FileNames[], DirectoryQ]];


SetDirectory["../build/atom-layout-data"];
Import["./atomColorsTabElectrons.wls"];
Import["./atomColorsTabProperties.wls"];
