var app = new Vue({
  el: '#table-container',
  data: {
    elements: [
      { atomicNumber: 1,   name: "Hydrogen",     abbreviation: "H",   id: "h",   group: "g-1",   period: "p-1",  block: "s",  atomicMass: 1.008,  boilingPoint: 20.271,  meltingPoint: 13.99, discoveryDate: 1766 },
      { atomicNumber: 2,   name: "Helium",       abbreviation: "He",  id: "he",  group: "g-18",  period: "p-1",  block: "s",  atomicMass: 4.003, boilingPoint: 4.222,   meltingPoint: -1,    discoveryDate: 1895 },
      //Double checked until this point. From rsc.org
      { atomicNumber: 3,   name: "Lithium",      abbreviation: "Li",  id: "li",  group: "g-1",   period: "p-2" },
      { atomicNumber: 4,   name: "Beryllium",    abbreviation: "Be",  id: "be",  group: "g-2",   period: "p-2" },
      { atomicNumber: 5,   name: "Boron",        abbreviation: "B",   id: "b",   group: "g-13",  period: "p-2" },
      { atomicNumber: 6,   name: "Carbon",       abbreviation: "C",   id: "c",   group: "g-14",  period: "p-2" },
      { atomicNumber: 7,   name: "Nitrogen",     abbreviation: "N",   id: "n",   group: "g-15",  period: "p-2" },
      { atomicNumber: 8,   name: "Oxygen",       abbreviation: "O",   id: "o",   group: "g-16",  period: "p-2" },
      { atomicNumber: 9,   name: "Flourine",     abbreviation: "Fl",  id: "fl",  group: "g-17",  period: "p-2" },
      { atomicNumber: 10,  name: "Neon",         abbreviation: "N",   id: "n",   group: "g-18",  period: "p-2" },
      { atomicNumber: 11,  name: "Sodium",       abbreviation: "Na",  id: "na",  group: "g-1",   period: "p-3" },
      { atomicNumber: 12,  name: "Magnesium",    abbreviation: "Mg",  id: "mg",  group: "g-2",   period: "p-3" },
      { atomicNumber: 13,  name: "Aluminium",    abbreviation: "Al",  id: "al",  group: "g-13",  period: "p-3" },
      { atomicNumber: 14,  name: "Silicon",      abbreviation: "Si",  id: "si",  group: "g-14",  period: "p-3" },
      { atomicNumber: 15,  name: "Phosphorous",  abbreviation: "P",   id: "p",   group: "g-15",  period: "p-3" },
      { atomicNumber: 16,  name: "Sulfur",       abbreviation: "S",   id: "s",   group: "g-16",  period: "p-3" },
      { atomicNumber: 17,  name: "Chlorine",     abbreviation: "Cl",  id: "cl",  group: "g-17",  period: "p-3" },
      { atomicNumber: 18,  name: "Argon",        abbreviation: "Ar",  id: "ar",  group: "g-18",  period: "p-3" },
      { atomicNumber: 19,  name: "Potassium",    abbreviation: "K",   id: "k",   group: "g-1",   period: "p-4" },
      { atomicNumber: 20,  name: "Calcium",      abbreviation: "Ca",  id: "ca",  group: "g-2",   period: "p-4" },
      { atomicNumber: 21,  name: "Scandium",     abbreviation: "Sc",  id: "sc",  group: "g-3",   period: "p-4" },
      { atomicNumber: 22,  name: "Titanium",     abbreviation: "Ti",  id: "ti",  group: "g-4",   period: "p-4" },
      { atomicNumber: 23,  name: "Vanadium",     abbreviation: "V",   id: "v",   group: "g-5",   period: "p-4" },
      { atomicNumber: 24,  name: "Chromium",     abbreviation: "Cr",  id: "cr",  group: "g-6",   period: "p-4" },
      { atomicNumber: 25,  name: "Manganese",    abbreviation: "Mn",  id: "mn",  group: "g-7",   period: "p-4" },
      { atomicNumber: 26,  name: "Iron",         abbreviation: "Fe",  id: "fe",  group: "g-8",   period: "p-4" },
      { atomicNumber: 27,  name: "Cobalt",       abbreviation: "Co",  id: "co",  group: "g-9",   period: "p-4" },
      { atomicNumber: 28,  name: "Nickel",       abbreviation: "Ni",  id: "ni",  group: "g-10",  period: "p-4" },
      { atomicNumber: 29,  name: "Copper",       abbreviation: "Cu",  id: "cu",  group: "g-11",  period: "p-4" },
      { atomicNumber: 30,  name: "Zinc",         abbreviation: "Zn",  id: "zn",  group: "g-12",  period: "p-4" },
      { atomicNumber: 31,  name: "Gallium",      abbreviation: "Ga",  id: "ga",  group: "g-13",  period: "p-4" },
      { atomicNumber: 32,  name: "Germanium",    abbreviation: "Ge",  id: "ge",  group: "g-14",  period: "p-4" },
      { atomicNumber: 33,  name: "Arsenic",      abbreviation: "As",  id: "as",  group: "g-15",  period: "p-4" },
      { atomicNumber: 34,  name: "Selenium",     abbreviation: "Se",  id: "se",  group: "g-16",  period: "p-4" },
      { atomicNumber: 35,  name: "Bromine",      abbreviation: "Br",  id: "br",  group: "g-17",  period: "p-4" },
      { atomicNumber: 36,  name: "Krypton",      abbreviation: "Kr",  id: "kr",  group: "g-18",  period: "p-4" },
      { atomicNumber: 37,  name: "Rubidium",     abbreviation: "Rb",  id: "rb",  group: "g-1",   period: "p-5" },
      { atomicNumber: 38,  name: "Strontium",    abbreviation: "Sr",  id: "sr",  group: "g-2",   period: "p-5" },
      { atomicNumber: 39,  name: "Yttrium",      abbreviation: "Y",   id: "y",   group: "g-3",   period: "p-5" },
      { atomicNumber: 40,  name: "Zirconium",    abbreviation: "Zr",  id: "zr",  group: "g-4",   period: "p-5" },
      { atomicNumber: 41,  name: "Niobium",      abbreviation: "Nb",  id: "nb",  group: "g-5",   period: "p-5" },
      { atomicNumber: 42,  name: "Molydbenum",   abbreviation: "Mo",  id: "mo",  group: "g-6",   period: "p-5" },


      //Skipping some elements (will write in later)

      { atomicNumber: 87, name: "Francium",      abbreviation: "Fr",  id: "fr",  period: "p-7", group: "g-1" },
      { atomicNumber: 118, name: "Oganesson",    abbreviation: "Og",  id: "og",  period: "p-7", group: "g-18" }
    ]
  }
})
