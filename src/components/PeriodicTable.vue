<template>
  <div id="grid-container-outer" class="has-shadow">
    <div id="grid-container">
      <main id="grid">

        <!-- ELEMENT OVERVIEW PANNEL -->
        <section id="element-overview" v-bind:class="hoverColor" v-cloak>
            <div id="element-overview-inner">
              <p id="element-ov-name" class="element-ov-secondary-info">{{ hoverAtomicNumber }}</p>
              <p id="element-ov-abbreviation" class="element-ov-primary-info">{{ hoverAbbreviation }}</p>
              <p id="element-ov-name" class="element-ov-secondary-info">{{ hoverName }}</p>
              <p id="element-ov-mass" class="element-ov-secondary-info">{{ hoverAtomicMass }}</p>
            </div>
        </section>

        <!-- ELEMENT DESCRIPTIONS -->
        <section id="element-desc" v-bind:class="hoverColor" v-cloak>
          <div id="element-desc-inner">
            <p id="element-d-discovery-date" class="element-d-primary-info">Discovery Date</p>
            <p id="element-discovery-date" class="element-d-secondary-info">{{ hoverDiscoveryDate }}</p>
            <p id="element-d-discoverer" class="element-d-primary-info">Discovered By </p>
            <p id="element-discoverer" class="element-d-secondary-info">{{ hoverDiscoveredBy }}</p>
          </div>
        </section>

        <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
        <div class="element-outer" v-for="(element, index) in elements" v-on:mouseover="[setElementColor(index, 'dark-'), changeLabelColor(index, 'true'), updateElementInfoAndDesc(index)]" v-on:mouseleave="[setElementColor(index, ''), changeLabelColor(index, 'false'), updateElementInfoAndDesc(index)]" v-on:click="[clickElement(index), updateElementInfoAndDesc(index)]" v-bind:class="[element.column, element.row, elementColors[element.atomicNumber-1], element.period, element.group]" v-bind:id="element.id">
          <div v-cloak class="element-inner">
            <!--<p>{{ index + 1 }}</p> Turn this element on if not sure if v-for loop "linked" w/ each atomic element (should be the same)-->
            <p class="element-atomicNumber element-secondary-info" ref="elementAtomicNumberDOM">{{ element.atomicNumber }}</p>
            <p class="element-abbreviation element-primary-info" ref="elementAbbreviationDOM">{{ element.abbreviation }}</p>
            <p class="element-name element-secondary-info" ref="elementNameDOM">{{ element.name }}</p>
            <p class="element-atomicMass element-secondary-info" ref="elementAtomicMassDOM">{{ element.atomicMass }}</p>
          </div>
        </div>

        <!-- PERIOD LABELS -->
        <div class="label-period-outer" v-for="(periodLabel, index) in periodLabels" v-bind:class="[periodLabel.row, periodLabel.column]">
          <div v-cloak class="label-period-inner" v-bind:class="periodLabels[index].color" v-on:mouseover="[maintenanceBefore(index, 'mouseOver'), darkenElements(index, 'dark-', 'period'), lightenElements(index, 'light-', 'period', 'p-'), maintenanceAfter(index, 'mouseOver')]" v-on:mouseleave="[maintenanceBefore(index, 'mouseLeave'), darkenElements(index, '', 'period'), lightenElements(index, '', 'period', 'p-'), maintenanceAfter(index, 'mouseLeave')]" v-on:click="periodNotification(index)">
            <p class="label-text">{{ periodLabel.display }}</p>
          </div>
        </div>

        <!-- GROUP LABELS -->
        <div class="label-group-outer" v-for="(groupLabel, index) in groupLabels" v-bind:class="[groupLabel.row, groupLabel.column]">
          <div v-cloak class="label-group-inner" v-bind:class="groupLabels[index].color" v-on:mouseover="[maintenanceBefore(index, 'mouseOver'), darkenElements(index, 'dark-', 'group'), lightenElements(index, 'light-', 'group', 'g-'), maintenanceAfter(index, 'mouseOver')]" v-on:mouseleave="[maintenanceBefore(index, 'mouseLeave'), darkenElements(index, '', 'group'), lightenElements(index, '', 'group', 'g-'), maintenanceAfter(index, 'mouseLeave')]" v-on:click="groupNotification(index)">
            <p class="label-text">{{ groupLabel.display }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
   export default {
     name: 'PeriodicTable',
     data () {
       return {
         elements: [
           { atomicNumber: 1,         name: "Hydrogen",       abbreviation: "H",       id: "h",    group: "g-1",    period: "p-1",   column: "c-2",   row: "r-2",   block: "s",  atomicMass: 1.008,    meltingPoint: 13.99,      boilingPoint: 20.271,    discoveryDate: 1766,            discoveredBy: "Henry Cavendish" },
           { atomicNumber: 2,         name: "Helium",         abbreviation: "He",      id: "he",   group: "g-18",   period: "p-1",   column: "c-36",  row: "r-2",   block: "s",  atomicMass: 4.003,    meltingPoint: -1,         boilingPoint: 4.222,     discoveryDate: 1895,            discoveredBy: "Sir William Ramsay, Per Teodor Cleve, and Nils Abraham" },
           { atomicNumber: 3,         name: "Lithium",        abbreviation: "Li",      id: "li",   group: "g-1",    period: "p-2",   column: "c-2",   row: "r-4",   block: "s",  atomicMass: 6.940,    meltingPoint: 453.65,     boilingPoint: 1615,      discoveryDate: 1817,            discoveredBy: "Johan August Arfvedson" },
           { atomicNumber: 4,         name: "Beryllium",      abbreviation: "Be",      id: "be",   group: "g-2",    period: "p-2",   column: "c-4",   row: "r-4",   block: "s",  atomicMass: 9.012,    meltingPoint: 1560,       boilingPoint: 2741,      discoveryDate: 1797,            discoveredBy: "Nicholas Louis Vauquelin" },
           { atomicNumber: 5,         name: "Boron",          abbreviation: "B",       id: "b",    group: "g-13",   period: "p-2",   column: "c-26",  row: "r-4",   block: "p",  atomicMass: 10.810,   meltingPoint: 2350,       boilingPoint: 4273,      discoveryDate: 1808,            discoveredBy: "Louis-Josef Gay-Lussac, Louis-Jacques Thénard, and Humphry Davy" },
           { atomicNumber: 6,         name: "Carbon",         abbreviation: "C",       id: "c",    group: "g-14",   period: "p-2",   column: "c-28",  row: "r-4",   block: "p",  atomicMass: 12.011,   meltingPoint: 4098,       boilingPoint: 4098,      discoveryDate: "Prehistoric",   discoveredBy: "Prehistoric" },
           { atomicNumber: 7,         name: "Nitrogen",       abbreviation: "N",       id: "n",    group: "g-15",   period: "p-2",   column: "c-30",  row: "r-4",   block: "p",  atomicMass: 14.007,   meltingPoint: 63.2,       boilingPoint: 77.355,    discoveryDate: 1772,            discoveredBy: "Daniel Rutherford" },
           { atomicNumber: 8,         name: "Oxygen",         abbreviation: "O",       id: "o",    group: "g-16",   period: "p-2",   column: "c-32",  row: "r-4",   block: "p",  atomicMass: 15.999,   meltingPoint: 54.36,      boilingPoint: 90.188,    discoveryDate: 1774,            discoveredBy: "Joseph Priestley and Carl Wilhelm Scheele" },
           { atomicNumber: 9,         name: "Flourine",       abbreviation: "F",       id: "f",    group: "g-17",   period: "p-2",   column: "c-34",  row: "r-4",   block: "p",  atomicMass: 18.998,   meltingPoint: 53.48,      boilingPoint: 85.04,     discoveryDate: 1886,            discoveredBy: "Henri Moissan" },
           { atomicNumber: 10,        name: "Neon",           abbreviation: "Ne",      id: "ne",   group: "g-18",   period: "p-2",   column: "c-36",  row: "r-4",   block: "p",  atomicMass: 20.180,   meltingPoint: 24.56,      boilingPoint: 27.104,    discoveryDate: 1898,            discoveredBy: "Sir William Ramsay and Morris Travers" },
           { atomicNumber: 11,        name: "Sodium",         abbreviation: "Na",      id: "na",   group: "g-1",    period: "p-3",   column: "c-2",   row: "r-6",   block: "s",  atomicMass: 22.990,   meltingPoint: 370.944,    boilingPoint: 1156.090,  discoveryDate: 1807,            discoveredBy: "Humphry Davy" },
           { atomicNumber: 12,        name: "Magnesium",      abbreviation: "Mg",      id: "mg",   group: "g-2",    period: "p-3",   column: "c-4",   row: "r-6",   block: "s",  atomicMass: 24.305,   meltingPoint: 923,        boilingPoint: 1363,      discoveryDate: 1755,            discoveredBy: "Joseph Black" },
           { atomicNumber: 13,        name: "Aluminium",      abbreviation: "Al",      id: "al",   group: "g-13",   period: "p-3",   column: "c-26",  row: "r-6",   block: "p",  atomicMass: 26.982,   meltingPoint: 933.473,    boilingPoint: 2792,      discoveryDate: 1825,            discoveredBy: "Hans Oersted" },
           { atomicNumber: 14,        name: "Silicon",        abbreviation: "Si",      id: "si",   group: "g-14",   period: "p-3",   column: "c-28",  row: "r-6",   block: "p",  atomicMass: 28.085,   meltingPoint: 1687,       boilingPoint: 3538,      discoveryDate: 1824,            discoveredBy: "Jöns Jacob Berzelius" },
           { atomicNumber: 15,        name: "Phosphorous",    abbreviation: "P",       id: "p",    group: "g-15",   period: "p-3",   column: "c-30",  row: "r-6",   block: "p",  atomicMass: 30.974,   meltingPoint: 317.3,      boilingPoint: 553.7,     discoveryDate: 1669,            discoveredBy: "Hennig Brandt" },
           { atomicNumber: 16,        name: "Sulfur",         abbreviation: "S",       id: "s",    group: "g-16",   period: "p-3",   column: "c-32",  row: "r-6",   block: "p",  atomicMass: 32.060,   meltingPoint: 388.36,     boilingPoint: 717.76,    discoveryDate: "Prehistoric",   discoveredBy: "Prehistoric" },
           { atomicNumber: 17,        name: "Chlorine",       abbreviation: "Cl",      id: "cl",   group: "g-17",   period: "p-3",   column: "c-34",  row: "r-6",   block: "p",  atomicMass: 35.450,   meltingPoint: 171.7,      boilingPoint: 239.11,    discoveryDate: 1774,            discoveredBy: "Carl Wilhelm Scheele" },
           { atomicNumber: 18,        name: "Argon",          abbreviation: "Ar",      id: "ar",   group: "g-18",   period: "p-3",   column: "c-36",  row: "r-6",   block: "p",  atomicMass: 39.948,   meltingPoint: 83.81,      boilingPoint: 87.302,    discoveryDate: 1894,            discoveredBy: "Lord Rayleigh and Sir William Ramsay" },
           { atomicNumber: 19,        name: "Potassium",      abbreviation: "K",       id: "k",    group: "g-1",    period: "p-4",   column: "c-2",   row: "r-8",   block: "s",  atomicMass: 39.098,   meltingPoint: 336.7,      boilingPoint: 1032,      discoveryDate: 1807,            discoveredBy: "Humphry Davy" },
           { atomicNumber: 20,        name: "Calcium",        abbreviation: "Ca",      id: "ca",   group: "g-2",    period: "p-4",   column: "c-4",   row: "r-8",   block: "s",  atomicMass: 40.078,   meltingPoint: 1115,       boilingPoint: 1757,      discoveryDate: 1808,            discoveredBy: "Humphry Davy" },
           { atomicNumber: 21,        name: "Scandium",       abbreviation: "Sc",      id: "sc",   group: "g-3",    period: "p-4",   column: "c-6",   row: "r-8",   block: "d",  atomicMass: 44.956,   meltingPoint: 1814,       boilingPoint: 3109,      discoveryDate: 1879,            discoveredBy: "Lars Frederik Nilson" },
           { atomicNumber: 22,        name: "Titanium",       abbreviation: "Ti",      id: "ti",   group: "g-4",    period: "p-4",   column: "c-8",   row: "r-8",   block: "d",  atomicMass: 47.867,   meltingPoint: 1943,       boilingPoint: 3560,      discoveryDate: 1791,            discoveredBy: "William Gregor" },
           { atomicNumber: 23,        name: "Vanadium",       abbreviation: "V",       id: "v",    group: "g-5",    period: "p-4",   column: "c-10",  row: "r-8",   block: "d",  atomicMass: 50.942,   meltingPoint: 2183,       boilingPoint: 3680,      discoveryDate: 1801,            discoveredBy: "Andrés Manuel del Río" },
           { atomicNumber: 24,        name: "Chromium",       abbreviation: "Cr",      id: "cr",   group: "g-6",    period: "p-4",   column: "c-12",  row: "r-8",   block: "d",  atomicMass: 51.996,   meltingPoint: 2180,       boilingPoint: 2944,      discoveryDate: 1798,            discoveredBy: "Nicholas Louis Vauquelin" },
           { atomicNumber: 25,        name: "Manganese",      abbreviation: "Mn",      id: "mn",   group: "g-7",    period: "p-4",   column: "c-14",  row: "r-8",   block: "d",  atomicMass: 54.938,   meltingPoint: 1519,       boilingPoint: 2334,      discoveryDate: 1774,            discoveredBy: "Johan Gottlieb Gahn" },
           { atomicNumber: 26,        name: "Iron",           abbreviation: "Fe",      id: "fe",   group: "g-8",    period: "p-4",   column: "c-16",  row: "r-8",   block: "d",  atomicMass: 55.845,   meltingPoint: 1811,       boilingPoint: 3134,      discoveryDate: "~ 3500 B.C.",   discoveredBy: "N / A" },
           { atomicNumber: 27,        name: "Cobalt",         abbreviation: "Co",      id: "co",   group: "g-9",    period: "p-4",   column: "c-18",  row: "r-8",   block: "d",  atomicMass: 58.933,   meltingPoint: 1768,       boilingPoint: 3200,      discoveryDate: 1739,            discoveredBy: "Georg Brandt" },
           { atomicNumber: 28,        name: "Nickel",         abbreviation: "Ni",      id: "ni",   group: "g-10",   period: "p-4",   column: "c-20",  row: "r-8",   block: "d",  atomicMass: 58.693,   meltingPoint: 1728,       boilingPoint: 3186,      discoveryDate: 1751,            discoveredBy: "Axel Fredrik Cronstedt" },
           { atomicNumber: 29,        name: "Copper",         abbreviation: "Cu",      id: "cu",   group: "g-11",   period: "p-4",   column: "c-22",  row: "r-8",   block: "d",  atomicMass: 63.546,   meltingPoint: 1357.77,    boilingPoint: 2833,      discoveryDate: "Prehistoric",   discoveredBy: "Prehistoric" },
           { atomicNumber: 30,        name: "Zinc",           abbreviation: "Zn",      id: "zn",   group: "g-12",   period: "p-4",   column: "c-24",  row: "r-8",   block: "d",  atomicMass: 65.380,   meltingPoint: 692.677,    boilingPoint: 1180,      discoveryDate: 1746,            discoveredBy: "Andreas Marggraf" },  //discoveryDate as "Zinc" was 1746, but Greeks and Romans knew about element before -20
           { atomicNumber: 31,        name: "Gallium",        abbreviation: "Ga",      id: "ga",   group: "g-13",   period: "p-4",   column: "c-26",  row: "r-8",   block: "p",  atomicMass: 69.723,   meltingPoint: 302.9146,   boilingPoint: 2502,      discoveryDate: 1875,            discoveredBy: "Paul-Émile Lecoq de Boisbaudran" },
           { atomicNumber: 32,        name: "Germanium",      abbreviation: "Ge",      id: "ge",   group: "g-14",   period: "p-4",   column: "c-28",  row: "r-8",   block: "p",  atomicMass: 72.630,   meltingPoint: 1211.4,     boilingPoint: 3106,      discoveryDate: 1886,            discoveredBy: "Clemens Winkler" },
           { atomicNumber: 33,        name: "Arsenic",        abbreviation: "As",      id: "as",   group: "g-15",   period: "p-4",   column: "c-30",  row: "r-8",   block: "p",  atomicMass: 74.922,   meltingPoint: 889,        boilingPoint: 889,       discoveryDate: "~1250",         discoveredBy: "Albertus Magnus" },
           { atomicNumber: 34,        name: "Selenium",       abbreviation: "Se",      id: "se",   group: "g-16",   period: "p-4",   column: "c-32",  row: "r-8",   block: "p",  atomicMass: 78.971,   meltingPoint: 494,        boilingPoint: 958,       discoveryDate: 1817,            discoveredBy: "Jöns Jacob Berzelius" },
           { atomicNumber: 35,        name: "Bromine",        abbreviation: "Br",      id: "br",   group: "g-17",   period: "p-4",   column: "c-34",  row: "r-8",   block: "p",  atomicMass: 79.904,   meltingPoint: 266,        boilingPoint: 322,       discoveryDate: 1826,            discoveredBy: "Antoine-Jérôme Balard and Carl Löwig" },
           { atomicNumber: 36,        name: "Krypton",        abbreviation: "Kr",      id: "kr",   group: "g-18",   period: "p-4",   column: "c-36",  row: "r-8",   block: "p",  atomicMass: 83.798,   meltingPoint: 115.78,     boilingPoint: 119.735,   discoveryDate: 1898,            discoveredBy: "Sir William Ramsay and Morris Travers" },
           { atomicNumber: 37,        name: "Rubidium",       abbreviation: "Rb",      id: "rb",   group: "g-1",    period: "p-5",   column: "c-2",   row: "r-10",  block: "s",  atomicMass: 85.468,   meltingPoint: 312.45,     boilingPoint: 961,       discoveryDate: 1861,            discoveredBy: "Gustav Kirchhoff and Robert Bunsen" },
           { atomicNumber: 38,        name: "Strontium",      abbreviation: "Sr",      id: "sr",   group: "g-2",    period: "p-5",   column: "c-4",   row: "r-10",  block: "s",  atomicMass: 87.620,   meltingPoint: 1050,       boilingPoint: 1650,      discoveryDate: 1790,            discoveredBy: "Adair Crawford" },
           { atomicNumber: 39,        name: "Yttrium",        abbreviation: "Y",       id: "y",    group: "g-3",    period: "p-5",   column: "c-6",   row: "r-10",  block: "d",  atomicMass: 88.906,   meltingPoint: 1795,       boilingPoint: 3618,      discoveryDate: 1794,            discoveredBy: "Johan Gadolin" },
           { atomicNumber: 40,        name: "Zirconium",      abbreviation: "Zr",      id: "zr",   group: "g-4",    period: "p-5",   column: "c-8",   row: "r-10",  block: "d",  atomicMass: 91.224,   meltingPoint: 2127,       boilingPoint: 4679,      discoveryDate: 1789,            discoveredBy: "Martin Heinrich Klaproth"},
           { atomicNumber: 41,        name: "Niobium",        abbreviation: "Nb",      id: "nb",   group: "g-5",    period: "p-5",   column: "c-10",  row: "r-10",  block: "d",  atomicMass: 92.906,   meltingPoint: 2750,       boilingPoint: 5014,      discoveryDate: 1801,            discoveredBy: "Charles Hatchett" },
           { atomicNumber: 42,        name: "Molybdenum",     abbreviation: "Mo",      id: "mo",   group: "g-6",    period: "p-5",   column: "c-12",  row: "r-10",  block: "d",  atomicMass: 95.950,   meltingPoint: 2895,       boilingPoint: 4912,      discoveryDate: 1781,            discoveredBy: "Peter Jacob Hjelm" },
           { atomicNumber: 43,        name: "Technetium",     abbreviation: "Tc",      id: "tc",   group: "g-7",    period: "p-5",   column: "c-14",  row: "r-10",  block: "d",  atomicMass: "(98)",   meltingPoint: 2430,       boilingPoint: 4535,      discoveryDate: 1937,            discoveredBy: "Carlo Perrier and Emilio Segre`" },
           { atomicNumber: 44,        name: "Ruthenium",      abbreviation: "Ru",      id: "ru",   group: "g-8",    period: "p-5",   column: "c-16",  row: "r-10",  block: "d",  atomicMass: 101.07,   meltingPoint: 2606,       boilingPoint: 4420,      discoveryDate: 1844,            discoveredBy: "Karl Karlovich Klaus" },
           { atomicNumber: 45,        name: "Rhodium",        abbreviation: "Rh",      id: "rh",   group: "g-9",    period: "p-5",   column: "c-18",  row: "r-10",  block: "d",  atomicMass: 102.906,  meltingPoint: 2236,       boilingPoint: 3968,      discoveryDate: 1803,            discoveredBy: "William Hyde Wollaston" },
           { atomicNumber: 46,        name: "Palladium",      abbreviation: "Pd",      id: "pd",   group: "g-10",   period: "p-5",   column: "c-20",  row: "r-10",  block: "d",  atomicMass: 106.42,   meltingPoint: 1828,       boilingPoint: 3236,      discoveryDate: 1803,            discoveredBy: "William Hyde Wollastom" },
           { atomicNumber: 47,        name: "Silver",         abbreviation: "Ag",      id: "ag",   group: "g-11",   period: "p-5",   column: "c-22",  row: "r-10",  block: "d",  atomicMass: 107.868,  meltingPoint: 1234.93,    boilingPoint: 2435,      discoveryDate: "~ 3000 B.C.",   discoveredBy: "N/A"},
           { atomicNumber: 48,        name: "Cadmium",        abbreviation: "Cd",      id: "cd",   group: "g-12",   period: "p-5",   column: "c-24",  row: "r-10",  block: "d",  atomicMass: 112.414,  meltingPoint: 594.219,    boilingPoint: 1040,      discoveryDate: 1817,            discoveredBy: "Friedrich Stromeyer" },
           { atomicNumber: 49,        name: "Indium",         abbreviation: "In",      id: "in",   group: "g-13",   period: "p-5",   column: "c-26",  row: "r-10",  block: "p",  atomicMass: 114.818,  meltingPoint: 429.75,     boilingPoint: 2300,      discoveryDate: 1863,            discoveredBy: "Ferdinand Reich and Hieronymous Richter" },
           { atomicNumber: 50,        name: "Tin",            abbreviation: "Sn",      id: "sn",   group: "g-14",   period: "p-5",   column: "c-28",  row: "r-10",  block: "p",  atomicMass: 118.710,  meltingPoint: 505.078,    boilingPoint: 2859,      discoveryDate: "~ 2100 B.C.",   discoveredBy: "N / A" },
           { atomicNumber: 51,        name: "Antmony",        abbreviation: "Sb",      id: "sb",   group: "g-15",   period: "p-5",   column: "c-30",  row: "r-10",  block: "p",  atomicMass: 121.760,  meltingPoint: 903.778,    boilingPoint: 1860,      discoveryDate: "~ 1600 B.C.",   discoveredBy: "N / A" },
           { atomicNumber: 52,        name: "Tellurium",      abbreviation: "Te",      id: "te",   group: "g-16",   period: "p-5",   column: "c-32",  row: "r-10",  block: "p",  atomicMass: 127.60,   meltingPoint: 722.66,     boilingPoint: 1261,      discoveryDate: 1783,            discoveredBy: "Franz-Joseph Müler von Reichenstein" },
           { atomicNumber: 53,        name: "Iodine",         abbreviation: "I",       id: "i",    group: "g-17",   period: "p-5",   column: "c-34",  row: "r-10",  block: "p",  atomicMass: 126.904,  meltingPoint: 386.9,      boilingPoint: 457.6,     discoveryDate: 1811,            discoveredBy: "Bernard Courtois" },
           { atomicNumber: 54,        name: "Xenon",          abbreviation: "Xe",      id: "xe",   group: "g-18",   period: "p-5",   column: "c-36",  row: "r-10",  block: "p",  atomicMass: 131.293,  meltingPoint: 161.4,      boilingPoint: 165.051,   discoveryDate: 1898,            discoveredBy: "Sir William Ramsay and Morris Travers" },
           { atomicNumber: 55,        name: "Caesium",        abbreviation: "Cs",      id: "cs",   group: "g-1",    period: "p-6",   column: "c-2",   row: "r-12",  block: "s",  atomicMass: 132.905,  meltingPoint: 301.7,      boilingPoint: 944,       discoveryDate: 1860,            discoveredBy: "Gustav Kirchhoff and Robert Bunsen" },
           { atomicNumber: 56,        name: "Barium",         abbreviation: "Ba",      id: "ba",   group: "g-2",    period: "p-6",   column: "c-4",   row: "r-12",  block: "s",  atomicMass: 137.327,  meltingPoint: 1000,       boilingPoint: 2118,      discoveryDate: 1808,            discoveredBy: "Humphry Davy" },
           // Start first extended portion of periodic table
           { atomicNumber: 57,        name: "Lanthanum",      abbreviation: "La",      id: "la",   group: "g-0",    period: "p-6",   column: "c-6",   row: "r-17",  block: "f",  atomicMass: 138.905,  meltingPoint: 1193,       boilingPoint: 3737,       discoveryDate: 1839,           discoveredBy: "Carl Gustav Mosander" },
           { atomicNumber: 58,        name: "Cerium",         abbreviation: "Ce",      id: "ce",   group: "g-0",    period: "p-6",   column: "c-8",   row: "r-17",  block: "f",  atomicMass: 140.116,  meltingPoint: 1072,       boilingPoint: 3716,       discoveryDate: 1803,           discoveredBy: "Jo..ns Jacob Berzelius and Wilhelm Hisinger" },
           { atomicNumber: 59,        name: "Praseodymium",   abbreviation: "Pr",      id: "pr",   group: "g-0",    period: "p-6",   column: "c-10",  row: "r-17",  block: "f",  atomicMass: 140.908,  meltingPoint: 1204,       boilingPoint: 3793,       discoveryDate: 1885,           discoveredBy: "Carl Auer von Welsbach" },
           { atomicNumber: 60,        name: "Neodymium",      abbreviation: "Nd",      id: "nd",   group: "g-0",    period: "p-6",   column: "c-12",  row: "r-17",  block: "f",  atomicMass: 144.242,  meltingPoint: 1289,       boilingPoint: 3347,       discoveryDate: 1885,           discoveredBy: "Carl Auer von Welsbach" },
           { atomicNumber: 61,        name: "Promethium",     abbreviation: "Pm",      id: "pm",   group: "g-0",    period: "p-6",   column: "c-14",  row: "r-17",  block: "f",  atomicMass: "(145)",  meltingPoint: 1315,       boilingPoint: 3273,       discoveryDate: 1945,           discoveredBy: "Jacob A. Marinsky, Lawrence E. Glendenin, and Charles D. Coryell" },
           { atomicNumber: 62,        name: "Samarium",       abbreviation: "Sm",      id: "sm",   group: "g-0",    period: "p-6",   column: "c-16",  row: "r-17",  block: "f",  atomicMass: 150.36,   meltingPoint: 1345,       boilingPoint: 2067,       discoveryDate: 1879,           discoveredBy: "Paul-E`mile Lecoq de Boisbaudran" },
           { atomicNumber: 63,        name: "Europium",       abbreviation: "Eu",      id: "eu",   group: "g-0",    period: "p-6",   column: "c-18",  row: "r-17",  block: "f",  atomicMass: 151.964,  meltingPoint: 1095,       boilingPoint: 1802,       discoveryDate: 1901,           discoveredBy: "Euge'ne-Anatole Demarc'ay" },
           { atomicNumber: 64,        name: "Gadolinium",     abbreviation: "Gd",      id: "gd",   group: "g-0",    period: "p-6",   column: "c-20",  row: "r-17",  block: "f",  atomicMass: 157.25,   meltingPoint: 1586,       boilingPoint: 3546,       discoveryDate: 1880,           discoveredBy: "Jean Charles Galissard de Marignac"},
           { atomicNumber: 65,        name: "Terbium",        abbreviation: "Tb",      id: "tb",   group: "g-0",    period: "p-6",   column: "c-22",  row: "r-17",  block: "f",  atomicMass: 158.925,  meltingPoint: 1632,       boilingPoint: 3503,       discoveryDate: 1843,           discoveredBy: "Carl Gustav Mosander" },
           { atomicNumber: 66,        name: "Dysprosium",     abbreviation: "Dy",      id: "dy",   group: "g-0",    period: "p-6",   column: "c-24",  row: "r-17",  block: "f",  atomicMass: 162.500,  meltingPoint: 1685,       boilingPoint: 2840,       discoveryDate: 1886,           discoveredBy: "Paul-Émile Lecoq de Boisbaudran" },
           { atomicNumber: 67,        name: "Holmium",        abbreviation: "Ho",      id: "ho",   group: "g-0",    period: "p-6",   column: "cc-26", row: "r-17",  block: "f",  atomicMass: 164.930,  meltingPoint: 1745,       boilingPoint: 2973,       discoveryDate: 1878,           discoveredBy: "Per Teodor Cleve, Marc Delafontaine, and Louis Soret" },
           { atomicNumber: 68,        name: "Erbium",         abbreviation: "Er",      id: "er",   group: "g-0",    period: "p-6",   column: "cc-28", row: "r-17",  block: "f",  atomicMass: 167.259,  meltingPoint: 1802,       boilingPoint: 3141,       discoveryDate: 1843,           discoveredBy: "Carl Gustav Mosander" },
           { atomicNumber: 69,        name: "Thulium",        abbreviation: "Tm",      id: "tm",   group: "g-0",    period: "p-6",   column: "cc-30", row: "r-17",  block: "f",  atomicMass: 168.934,  meltingPoint: 1818,       boilingPoint: 2223,       discoveryDate: 1879,           discoveredBy: "Per Teodor Cleve" },
           { atomicNumber: 70,        name: "Ytterbium",      abbreviation: "Yb",      id: "yb",   group: "g-0",    period: "p-6",   column: "cc-32", row: "r-17",  block: "f",  atomicMass: 173.045,  meltingPoint: 1097,       boilingPoint: 1469,       discoveryDate: 1878,           discoveredBy: "Jean Charles Galissard de Marignac" },
           { atomicNumber: 71,        name: "Lutetium",       abbreviation: "Lu",      id: "lu",   group: "g-0",    period: "p-6",   column: "cc-34", row: "r-17",  block: "f",  atomicMass: 174.967,  meltingPoint: 1936,       boilingPoint: 3675,       discoveryDate: 1907,           discoveredBy: "Georges Urbain, Charles James" },
           // End first extended portion of the periodic table
           { atomicNumber: 72,        name: "Hafnium",        abbreviation: "Hf",      id: "hf",   group: "g-4",    period: "p-6",   column: "c-8",   row: "r-12",  block: "d",  atomicMass: 178.49,   meltingPoint: 2506,       boilingPoint: 4873,       discoveryDate: 1923,           discoveredBy: "George Charles de Hevesy and Dirk Coster" },
           { atomicNumber: 73,        name: "Tantalum",       abbreviation: "Ta",      id: "ta",   group: "g-5",    period: "p-6",   column: "c-10",  row: "r-12",  block: "d",  atomicMass: 180.948,  meltingPoint: 3290,       boilingPoint: 5728,       discoveryDate: 1802,           discoveredBy: "Anders Gustav Ekeberg" },
           { atomicNumber: 74,        name: "Tungsten",       abbreviation: "W",       id: "w",    group: "g-6",    period: "p-6",   column: "c-12",  row: "r-12",  block: "d",  atomicMass: 183.84,   meltingPoint: 3687,       boilingPoint: 5828,       discoveryDate: 1783,           discoveredBy: "Juan Elhuyar and Fausto Elhuyar" },
           { atomicNumber: 75,        name: "Rhenium",        abbreviation: "Re",      id: "re",   group: "g-7",    period: "p-6",   column: "c-14",  row: "r-12",  block: "d",  atomicMass: 186.207,  meltingPoint: 3458,       boilingPoint: 5863,       discoveryDate: 1925,           discoveredBy: "Walter Noddack, Ida Tacke, and Otto Berg" },
           { atomicNumber: 76,        name: "Osmium",         abbreviation: "Os",      id: "os",   group: "g-8",    period: "p-6",   column: "c-16",  row: "r-12",  block: "d",  atomicMass: 190.23,   meltingPoint: 3306,       boilingPoint: 5281,       discoveryDate: 1803,           discoveredBy: "Smithson Tennant" },
           { atomicNumber: 77,        name: "Iridium",        abbreviation: "Ir",      id: "ir",   group: "g-9",    period: "p-6",   column: "c-18",  row: "r-12",  block: "d",  atomicMass: 192.217,  meltingPoint: 2719,       boilingPoint: 4701,       discoveryDate: 1803,           discoveredBy: "Smithson Tennant" },
           { atomicNumber: 78,        name: "Platinum",       abbreviation: "Pt",      id: "pt",   group: "g-10",   period: "p-6",   column: "c-20",  row: "r-12",  block: "d",  atomicMass: 195.084,  meltingPoint: 2041.4,     boilingPoint: 4098,       discoveryDate: "Unknown",      discoveredBy: "South Americans before Colombus" },
           { atomicNumber: 79,        name: "Gold",           abbreviation: "Au",      id: "au",   group: "g-11",   period: "p-6",   column: "c-22",  row: "r-12",  block: "d",  atomicMass: 196.967,  meltingPoint: 1337.33,    boilingPoint: 3109,       discoveryDate: "~ 3000 B.C.",  discoveredBy: "N / A"},
           { atomicNumber: 80,        name: "Mercury",        abbreviation: "Hg",      id: "hg",   group: "g-12",   period: "p-6",   column: "c-24",  row: "r-12",  block: "d",  atomicMass: 200.592,  meltingPoint: 234.321,    boilingPoint: 629.769,    discoveryDate: "~ 1500 B.C.",  discoveredBy: "N / A" },
           { atomicNumber: 81,        name: "Thallium",       abbreviation: "Tl",      id: "tl",   group: "g-13",   period: "p-6",   column: "c-26",  row: "r-12",  block: "p",  atomicMass: 204.38,   meltingPoint: 577,        boilingPoint: 1746,       discoveryDate: 1861,           discoveredBy: "William Crookes" },
           { atomicNumber: 82,        name: "Lead",           abbreviation: "Pb",      id: "pb",   group: "g-14",   period: "p-6",   column: "c-28",  row: "r-12",  block: "p",  atomicMass: 207.2,    meltingPoint: 600.612,    boilingPoint: 2022,       discoveryDate: "Ancient",      discoveredBy: "N / A"},
           { atomicNumber: 83,        name: "Bismuth",        abbreviation: "Bi",      id: "bi",   group: "g-15",   period: "p-6",   column: "c-30",  row: "r-12",  block: "p",  atomicMass: 208.980,  meltingPoint: 544.556,    boilingPoint: 1837,       discoveryDate: "~1500 A.D.",   discoveredBy: "N / A" },
           { atomicNumber: 84,        name: "Polonium",       abbreviation: "Po",      id: "po",   group: "g-16",   period: "p-6",   column: "c-32",  row: "r-12",  block: "p",  atomicMass: "(209)",  meltingPoint: 527,        boilingPoint: 1235,       discoveryDate: 1898,           discoveredBy: "Marie Curie" },
           { atomicNumber: 85,        name: "Astatine",       abbreviation: "At",      id: "at",   group: "g-17",   period: "p-6",   column: "c-34",  row: "r-12",  block: "p",  atomicMass: "(210)",  meltingPoint: 573,        boilingPoint: 623,        discoveryDate: 1940,           discoveredBy: "Dale Corson, Kenneth MacKenzie, and Emillo Segre`" },
           { atomicNumber: 86,        name: "Radon",          abbreviation: "Rn",      id: "rn",   group: "g-18",   period: "p-6",   column: "c-36",  row: "r-12",  block: "p",  atomicMass: "(222)",  meltingPoint: 202,        boilingPoint: 211.5,      discoveryDate: 1900,           discoveredBy: "Friedrich Ernst Dorn" },
           { atomicNumber: 87,        name: "Francium",       abbreviation: "Fr",      id: "fr",   group: "g-1",    period: "p-7",   column: "c-2",   row: "r-14",  block: "s",  atomicMass: "(223)",  meltingPoint: 294,        boilingPoint: 923,        discoveryDate: 1939,           discoveredBy: "Marguerite Perey" },
           { atomicNumber: 88,        name: "Radium",         abbreviation: "Ra",      id: "ra",   group: "g-2",    period: "p-7",   column: "c-4",   row: "r-14",  block: "s",  atomicMass: "(226)",  meltingPoint: 969,        boilingPoint: 1773,       discoveryDate: 1898,           discoveredBy: "Pierre Curie and Marie Curie" },
           // Start second portion of the periodict table
           { atomicNumber: 89,        name: "Actinium",       abbreviation: "Fr",      id: "fr",   group: "g-0",    period: "p-7",   column: "c-6",   row: "r-19",  block: "f",  atomicMass: "(227)",  meltingPoint: 1323,       boilingPoint: 3473,       discoveryDate: 1899,          discoveredBy: "Andrew Debierne" },
           { atomicNumber: 90,        name: "Thorium",        abbreviation: "Th",      id: "th",   group: "g-0",    period: "p-7",   column: "c-8",   row: "r-19",  block: "f",  atomicMass: 232.038,  meltingPoint: 2023,       boilingPoint: 5058,       discoveryDate: 1829,          discoveredBy: "Jo..ns Jacob Berzelius" },
           { atomicNumber: 91,        name: "Protactinium",   abbreviation: "Pa",      id: "pa",   group: "g-0",    period: "p-7",   column: "c-10",  row: "r-19",  block: "f",  atomicMass: 231.036,  meltingPoint: 1845,       boilingPoint: 4273,       discoveryDate: 1913,          discoveredBy: "Kasimir Fajans and Otto Go..hring" },
           { atomicNumber: 92,        name: "Uranium",        abbreviation: "U",       id: "u",    group: "g-0",    period: "p-7",   column: "c-12",  row: "r-19",  block: "f",  atomicMass: 238.029,  meltingPoint: 1408,       boilingPoint: 4404,       discoveryDate: 1789,          discoveredBy: "Martin Heinrich Klaproth" },
           { atomicNumber: 93,        name: "Neptunium",      abbreviation: "Np",      id: "np",   group: "g-0",    period: "p-7",   column: "c-14",  row: "r-19",  block: "f",  atomicMass: "(237)",  meltingPoint: 917,        boilingPoint: 4175,       discoveryDate: 1940,          discoveredBy: "Edwin McMillian and Philip Abelson" },
           { atomicNumber: 94,        name: "Plutonium",      abbreviation: "Pu",      id: "pu",   group: "g-0",    period: "p-7",   column: "c-16",  row: "r-19",  block: "f",  atomicMass: "(244)",  meltingPoint: 913,        boilingPoint: 3501,       discoveryDate: 1940,          discoveredBy: "Glenn Seaborg and colleagues" },
           { atomicNumber: 95,        name: "Americium",      abbreviation: "Am",      id: "am",   group: "g-0",    period: "p-7",   column: "c-18",  row: "r-19",  block: "f",  atomicMass: "(243)",  meltingPoint: 1449,       boilingPoint: 2284,       discoveryDate: 1944,          discoveredBy: "Glenn Seabordg and colleagues" },
           { atomicNumber: 96,        name: "Curium",         abbreviation: "Cm",      id: "cm",   group: "g-0",    period: "p-7",   column: "c-20",  row: "r-19",  block: "f",  atomicMass: "(247)",  meltingPoint: 1618,       boilingPoint: "Unknown",  discoveryDate: 1944,          discoveredBy: "Glenn Seabordg and colleagues" },
           { atomicNumber: 97,        name: "Berkelium",      abbreviation: "Bk",      id: "bk",   group: "g-0",    period: "p-7",   column: "c-22",  row: "r-19",  block: "f",  atomicMass: "(247)",  meltingPoint: 1259,       boilingPoint: "Unknown",  discoveryDate: 1949,          discoveredBy: "Stanley Thompson, Albert Ghiorso, and Glenn Seaborg" },
           { atomicNumber: 98,        name: "Californium",    abbreviation: "Cf",      id: "cf",   group: "g-0",    period: "p-7",   column: "c-24",  row: "r-19",  block: "f",  atomicMass: "(251)",  meltingPoint: 1173,       boilingPoint: "Unknown",  discoveryDate: 1950,          discoveredBy: "Stanley Thompson, Kenneth Street Jr., Albert Ghiorso, and Glenn Seaborg" },
           { atomicNumber: 99,        name: "Einsteinium",    abbreviation: "Es",      id: "es",   group: "g-0",    period: "p-7",   column: "c-26",  row: "r-19",  block: "f",  atomicMass: "(252)",  meltingPoint: 1133,       boilingPoint: "Unknown",  discoveryDate: 1952,          discoveredBy: "Albert Ghiorso and colleagues" },
           { atomicNumber: 100,       name: "Fermium",        abbreviation: "Fm",      id: "fm",   group: "g-0",    period: "p-7",   column: "c-28",  row: "r-19",  block: "f",  atomicMass: "(256)",  meltingPoint: 1800,       boilingPoint: "Unknown",  discoveryDate: 1953,          discoveredBy: "Albert Ghiorso and colleagues" },
           { atomicNumber: 101,       name: "Mendelevium",    abbreviation: "Md",      id: "md",   group: "g-0",    period: "p-7",   column: "c-30",  row: "r-19",  block: "f",  atomicMass: "(258)",  meltingPoint: 1100,       boilingPoint: "Unknown",  discoveryDate: 1955,          discoveredBy: "Albert Ghiorso and colleagues" },
           { atomicNumber: 102,       name: "Nobelium",       abbreviation: "No",      id: "no",   group: "g-0",    period: "p-7",   column: "c-32",  row: "r-19",  block: "f",  atomicMass: "(259)",  meltingPoint: 1100,       boilingPoint: "Unknown",  discoveryDate: 1963,          discoveredBy: "Georgy Flerov and colleagues and Albert Ghiorso and colleagues" },
           { atomicNumber: 103,       name: "Lawrencium",     abbreviation: "Lr",      id: "lr",   group: "g-0",    period: "p-7",   column: "c-34",  row: "r-19",  block: "f",  atomicMass: "(262)",  meltingPoint: 1900,       boilingPoint: "Unknown",  discoveryDate: 1965,          discoveredBy: "Georgy Flerov and colleagues and Albert Ghiorso and colleagues" },
           //End second extented portion of the periodict table
           { atomicNumber: 104,       name: "Rutherfordium",  abbreviation: "Rf",      id: "rf",   group: "g-4",    period: "p-7",   column: "c-8",   row: "r-14",  block: "d",  atomicMass: "(267)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1964,          discoveredBy: "Georgy Flerov and colleagues and Albert Ghiorso and colleagues" },
           { atomicNumber: 105,       name: "Dubnium",        abbreviation: "Db",      id: "db",   group: "g-5",    period: "p-7",   column: "c-10",  row: "r-14",  block: "d",  atomicMass: "(268)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: "1968-1970",   discoveredBy: "No name" },
           { atomicNumber: 106,       name: "Seaborgium",     abbreviation: "Sg",      id: "sg",   group: "g-6",    period: "p-7",   column: "c-12",  row: "r-14",  block: "d",  atomicMass: "(269)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1974,          discoveredBy: "Albert Ghiorso and colleagues" },
           { atomicNumber: 107,       name: "Bohrium",        abbreviation: "Bh",      id: "bh",   group: "g-7",    period: "p-7",   column: "c-14",  row: "r-14",  block: "d",  atomicMass: "(270)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1981,          discoveredBy: "Peter Armbruster, Gottfried Mu..nzenberg and colleagues" },
           { atomicNumber: 108,       name: "Hassium",        abbreviation: "Hs",      id: "hs",   group: "g-8",    period: "p-7",   column: "c-16",  row: "r-14",  block: "d",  atomicMass: "(269)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1984,          discoveredBy: "Peter Armbruster, Gottfried Mu..nzenberg and colleagues" },
           { atomicNumber: 109,       name: "Meitnerium",     abbreviation: "Mt",      id: "mt",   group: "g-9",    period: "p-7",   column: "c-18",  row: "r-14",  block: "d",  atomicMass: "(278)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1982,          discoveredBy: "Peter Armbruster, Gottfried Mu..nzenberg and colleagues" },
           { atomicNumber: 110,       name: "Darmstadtium",   abbreviation: "Ds",      id: "ds",   group: "g-10",   period: "p-7",   column: "c-20",  row: "r-14",  block: "d",  atomicMass: "(281)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1994,          discoveredBy: "Sigurd Hofmann, Peter Armbruster and Gottfried Mu..nzenberg" },
           { atomicNumber: 111,       name: "Roentgenium",    abbreviation: "Rg",      id: "rg",   group: "g-11",   period: "p-7",   column: "c-22",  row: "r-14",  block: "d",  atomicMass: "(280)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1994,          discoveredBy: "Peter Armbruster and Gottfried My..nzenberg" },
           { atomicNumber: 112,       name: "Copernicium",    abbreviation: "Cn",      id: "cn",   group: "g-12",   period: "p-7",   column: "c-24",  row: "r-14",  block: "d",  atomicMass: "(285)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1996,          discoveredBy: "Sigurd Hofmann and colleagues" },
           { atomicNumber: 113,       name: "Nihonium",       abbreviation: "Nh",      id: "nh",   group: "g-13",   period: "p-7",   column: "c-26",  row: "r-14",  block: "p",  atomicMass: "(286)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 2004,          discoveredBy: "Scientists from R.I.K.E.N." },
           { atomicNumber: 114,       name: "Flerovium",      abbreviation: "Fl",      id: "fl",   group: "g-14",   period: "p-7",   column: "c-28",  row: "r-14",  block: "p",  atomicMass: "(289)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 1999,          discoveredBy: "Scientists from J.I.N.C. and L.L.N.L." },
           { atomicNumber: 115,       name: "Moscovium",      abbreviation: "Mc",      id: "mc",   group: "g-15",   period: "p-7",   column: "c-30",  row: "r-14",  block: "p",  atomicMass: "(289)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 2010,          discoveredBy: "Scientists from J.I.N.C., L.L.N.L., and O.R.N.L." },
           { atomicNumber: 116,       name: "Livermoreium",   abbreviation: "Lv",      id: "lv",   group: "g-16",   period: "p-7",   column: "c-32",  row: "r-14",  block: "p",  atomicMass: "(293)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 2000,          discoveredBy: "Scientists from J.I.N.C. and L.L.N.L." },
           { atomicNumber: 117,       name: "Tennessine",     abbreviation: "Ts",      id: "ts",   group: "g-17",   period: "p-7",   column: "c-34",  row: "r-14",  block: "p",  atomicMass: "(294)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 2010,          discoveredBy: "Scientists from J.I.N.C., L.L.N.L., and O.R.N.L." },
           { atomicNumber: 118,       name: "Oganesson",      abbreviation: "Og",      id: "og",   group: "g-18",   period: "p-7",   column: "c-36",  row: "r-14",  block: "p",  atomicMass: "(294)",  meltingPoint: "Unknown",  boilingPoint: "Unknown",  discoveryDate: 2006,          discoveredBy: "Scientists from J.I.N.C. and L.L.N.L." },
           // Currently, the atomicNumber must be exactly the same as the index in the array (this helps get the object that the user hovers over)
           { atomicNumber: 119,      name: "Lanthanides",     abbreviation: "Lan.",    id: "z1",   group: "g-0",    period: "p-0",   column: "c-6",   row: "r-12",  block: "f",  atomicMass: "1",       meltingPoint: "",        boilingPoint: "",        discoveryDate: "",           discoveredBy: "" },
           { atomicNumber: 120,      name: "Actinides",       abbreviation: "Act.",    id: "z2",   group: "g-0",    period: "p-0",   column: "c-6",   row: "r-14",  block: "f",  atomicMass: "1",       meltingPoint: "",        boilingPoint: "",        discoveryDate: "",           discoveredBy: "" },

         ],
         periodLabels: [
           // Labels for each period element
           { display: 1,   column: "cc-1",   row: "rr-2",  color: "light", name: "Period 1" },
           { display: 2,   column: "cc-1",   row: "rr-4",  color: "light", name: "Period 2" },
           { display: 3,   column: "cc-1",   row: "rr-6",  color: "light", name: "Period 3" },
           { display: 4,   column: "cc-1",   row: "rr-8",  color: "light", name: "Period 4" },
           { display: 5,   column: "cc-1",   row: "rr-10", color: "light", name: "Period 5" },
           { display: 6,   column: "cc-1",   row: "rr-12", color: "light", name: "Period 6" },
           { display: 7,   column: "cc-1",   row: "rr-14", color: "light", name: "Period 7" }
         ],
         groupLabels: [
           // Labels for each group element
           { display: 1,    column: "cc-2",   row: "rr-1", color: "light", name: "Alkali Metals" },
           { display: 2,    column: "cc-4",   row: "rr-1", color: "light", name: "Alkaline Earth Metals" },
           { display: 3,    column: "cc-6",   row: "rr-1", color: "light", name: "Scandium Family" },
           { display: 4,    column: "cc-8",   row: "rr-1", color: "light", name: "Titanium Family" },
           { display: 5,    column: "cc-10",  row: "rr-1", color: "light", name: "Vanadium Family" },
           { display: 6,    column: "cc-12",  row: "rr-1", color: "light", name: "Chromium Family" },
           { display: 7,    column: "cc-14",  row: "rr-1", color: "light", name: "Manganese Family" },
           { display: 8,    column: "cc-16",  row: "rr-1", color: "light", name: "Iron Family" },
           { display: 9,    column: "cc-18",  row: "rr-1", color: "light", name: "Cobalt Family" },
           { display: 10,   column: "cc-20",  row: "rr-1", color: "light", name: "Nickel Family" },
           { display: 11,   column: "cc-22",  row: "rr-1", color: "light", name: "Copper Family" },
           { display: 12,   column: "cc-24",  row: "rr-1", color: "light", name: "Zinc Family" },
           { display: 13,   column: "cc-26",  row: "rr-1", color: "light", name: "Boron Family" },
           { display: 14,   column: "cc-28",  row: "rr-1", color: "light", name: "Carbon Family" },
           { display: 15,   column: "cc-30",  row: "rr-1", color: "light", name: "Pnictogens" },
           { display: 16,   column: "cc-32",  row: "rr-1", color: "light", name: "Chalcogens" },
           { display: 17,   column: "cc-34",  row: "rr-1", color: "light", name: "Halogens" },
           { display: 18,   column: "cc-36",  row: "rr-1", color: "light", name: "Noble Gases" }
         ],
         // These elements are the defaults. Should only change when  user clicks on a different tab like "orbitals", "properties", etc.
         elementsDefaultColor: [
           // Period 1
           "blue", "blue",
           // Period 2
           "blue", "blue", "red", "red", "red", "red", "red", "red",
           // Period 3
           "blue", "blue", "red", "red", "red", "red", "red", "red",
           // Period 4
           "blue", "blue", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "red", "red", "red", "red", "red", "red",
           // Period 5
           "blue", "blue", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "red", "red", "red", "red", "red", "red",
           // Period 6
           "blue", "blue", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange",
           "green", "green", "green", "green", "green", "green", "green", "green", "green", "red", "red", "red", "red", "red", "red",
           // Period 7
           "blue", "blue", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange",
           "green", "green", "green", "green", "green", "green", "green", "green", "green", "red", "red", "red", "red", "red", "red", "orange", "orange",
         ],

         // These colors should be displayed
         elementColors: [
         // Period 1
         "blue", "blue",
         // Period 2
         "blue", "blue", "red", "red", "red", "red", "red", "red",
         // Period 3
         "blue", "blue", "red", "red", "red", "red", "red", "red",
         // Period 4
         "blue", "blue", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "red", "red", "red", "red", "red", "red",
         // Period 5
         "blue", "blue", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "red", "red", "red", "red", "red", "red",
         // Period 6
         "blue", "blue", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange",
         "green", "green", "green", "green", "green", "green", "green", "green", "green", "red", "red", "red", "red", "red", "red",
         // Period 7
         "blue", "blue", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange",
         "green", "green", "green", "green", "green", "green", "green", "green", "green", "red", "red", "red", "red", "red", "red", "orange", "orange"
         ],
         hoverAtomicNumber: "1",
         hoverAbbreviation: "H",
         hoverName: "Hydrogen",
         hoverAtomicMass: 1.008,
         hoverBlock: "s",
         hoverColor: "blue", //This actually changes the color
         hoverDiscoveryDate: "1766",
         hoverDiscoveredBy: "Henry Cavendish",

         clickActive: false,

         // When user clicks, want to make clicked element darker than if it was highlighted
         clickedElementIndex: -1,
         clickedElementPeriod: -1,
         clickedElementGroup: -1
       }
     },
     methods: {
       updateElementInfoAndDesc: function(index) {
         // Do not add one to index because v-for array starts at 0 and, trying to get the element at a certain position in v-for array loop
         // Update element overview
         if(this.clickActive == false) {
           this.hoverAtomicNumber = this.$refs.elementAtomicNumberDOM[index].innerHTML;
           this.hoverAbbreviation = this.$refs.elementAbbreviationDOM[index].innerHTML;
           this.hoverName = this.$refs.elementNameDOM[index].innerHTML;
           this.hoverAtomicMass = this.$refs.elementAtomicMassDOM[index].innerHTML;

           // Update element description
           this.hoverDiscoveryDate = this.elements[index].discoveryDate;
           this.hoverDiscoveredBy = this.elements[index].discoveredBy;
           this.hoverColor = this.elementsDefaultColor[index];
         }
       },

       // Changes shade of hovered element (lighten or darken, or default)
       setElementColor: function(index, shade) {
       if(this.clickedElementIndex != index) {
           // Gets current default color
           var defaultColor = this.elementsDefaultColor[index];

           // Sets current default color
           Vue.set(this.elementColors, index, (shade + defaultColor));
         }
       },
       // Sets the color of all elements (usually the default color)
       setAllElementsColor: function(shade) {
         for(var i = 0; i < this.elementColors.length; i++)
         {
           if(i != this.clickedElementIndex)
           {
             var current = this.elementsDefaultColor[i];
             this.elementColors[i] = shade + current;
           }
         }
       },
       // Similar to setElementColor, but does it by force (sets color even if ths.clickedElementIndex if the same as the index)
       setElementColorForce: function(index, shade) {
         // Gets current default color
         var defaultColor = this.elementsDefaultColor[index];

         // Sets current default color
         Vue.set(this.elementColors, index, (shade + defaultColor));
       },
       darkenElements: function(index, prefix, type) {
         var className = this.labelNoneToClass(index + 1, type);

         var elements = document.getElementsByClassName(className);
         // For each element in the array, highlight it
         for(var i = 0; i < elements.length; i++) {
           // Get the atomicNumber of the element
           var element = elements[i].firstChild.children[0].innerText;
           var defaultColor = this.elementsDefaultColor[element - 1];

           Vue.set(this.elementColors, element - 1, (prefix + defaultColor));
         }
       },
       lightenElements: function(index, prefix, type, typeShort) {
         // className are the classes that need to be highlighted "p" stands for period, "g" stands for group
         var className = this.labelNoneToClass(index + 1, type);

         // Get the length of the array to be used (depends on period / group)
         if(type == "period")
         {
          var arrayType = this.periodLabels
         }
         else if(type == "group")
         {
           var arrayType = this.groupLabels
         }

         var elementToChangeColor = [];
         // For every single period or group, check if the class we are darkening is the same as the one we want to lighten.
         // If not, then add that group of elements to the array
         for(var i = 0; i <= arrayType.length; i++) {
           var AClassName = (typeShort + i);
           var ithElements = [];
           if(AClassName != className)
           {
             ithElements = document.getElementsByClassName(AClassName)
           }
           // When adding to the main array (elementToChangeColor), add the element atomicNumber
           for(var j = 0; j < ithElements.length; j++) {
             var temp = [];
             // Adding all the atomicNumbers of nums that will lighten to an array
             temp = ithElements[j].firstChild.children[0].innerText;
             elementToChangeColor = elementToChangeColor.concat(temp);
           }
         }
         // elementToChangeColor is final array containing all the atomicNumbers of elements that need to lighten
         for(var i = 0; i < elementToChangeColor.length; i++) {
           var element = elementToChangeColor[i];
           var defaultColor = this.elementsDefaultColor[element - 1];

           // For each element, prepend "light-" to property color. Since property is binded to class, a CSS tyle will update the new colour
           Vue.set(this.elementColors, element - 1, (prefix + defaultColor));
         }
       },
       changeLabelColor: function(index, isMouseOver) {
         // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
         // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

         // Get the period or group value corresponding to the hovered over element (ex. c-11, p-5)
         var periodFull = this.elements[index].period;
         var groupFull = this.elements[index].group;

         // Concatonate period or group values to a number (ex. 11, 5)
         var period = this.labelClassToNone(periodFull);
         var group = this.labelClassToNone(groupFull);

         if(this.clickActive == false) {
           // When changing a label, make sure all others are turned off first
           for(var i = 0; i < this.periodLabels.length; i++) {
             this.periodLabels[i].color = "light";
           }
           for(var i = 0; i < this.groupLabels.length; i++) {
              this.groupLabels[i].color = "light";
           }

           // Only darken the label if the element actually has a valid period number (within the actual range of the periodic table)
           if (period > 0 && period < 8) {
             // Darken the labels if the mouse is entering an element
            if(isMouseOver == "true")
             {
               this.periodLabels[period - 1].color = "dark";
             }
             // Lighten the labels if the mouse is leaving an element
             else if(isMouseOver == "false")
             {
               this.periodLabels[period - 1].color = "light";
             }
             else
             {
               console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
             }
           }
           // Only darken the label if the element actually has a valid group number (within the actual range of the periodic table)
           if (group > 0 && group < 19) {
             // Darken the labels if the mouse is entering an element
             if(isMouseOver == "true") {
               this.groupLabels[group - 1].color = "dark";
             }
             // Lighten the labels if the moues is leaving an element
             else if(isMouseOver == "false") {
               this.groupLabels[group - 1].color = "light";
             }
             else {
               console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
             }
           }
         }
       },
       // type can either be "mouesOver" or "mouseLeave"
       maintenanceBefore: function(index, type) {
         if(type == "mouseOver") {
           // Maintenance (making sure all other labels are not activated, before activating some)
           this.clearLabelExcept(-1, -1);
         }
       },
       // type can either be "mouesOver" or "mouseLeave"
       maintenanceAfter: function(index, type) {
         if(type == "mouseLeave") {
           // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
           // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
           if(this.clickActive == true)
           {
             // Recall that this.clickedElementPeriod and this.clickedElementGroup are NOT indexes; they are actual values
             // We don't want to change color when this.clickedElementPeriod / group is 0 that value is for groupless elements (lanth. and act. elements)
             // Nor do we want to change color when this.clickedElementPeriod / group is -1, because that occurs when this.clickActive is false (I think this is already covered, but just a precaution)
             if(this.clickedElementPeriod > 0) {
               this.periodLabels[this.clickedElementPeriod - 1].color = "dark";
             }
             if(this.clickedElementGroup > 0) {
               this.groupLabels[this.clickedElementGroup - 1].color = "dark";
             }
             this.elementColors[this.clickedElementIndex] = "supdark-" + this.elementsDefaultColor[this.clickedElementIndex];
           }
         }
       },
       clearLabelExcept: function(periodExclude, groupExclude) {
         // Clears all period / group labels, except for one period / group label
         for(var i = 0; i < this.periodLabels.length; i++) {
           if(i != periodExclude) {
             this.periodLabels[i].color = "light";
           }
         }
         for(var i = 0; i < this.groupLabels.length; i++) {
           if(i != groupExclude) {
             this.groupLabels[i].color = "light";
           }
         }
       },
       // When element is clicked, darken it
       clickElement: function(index) {
         // What to do if clicking for the first time, or clicking on a different element
         // Save the index (element index, period index, and group index) of the clicked on element
         if(this.clickedElementIndex == -1 || this.clickedElementIndex != index) {
           this.clickActive = true;
           this.clickedElementIndex = index;
           this.clickedElementPeriod = this.labelClassToNone( this.elements[index].period );
           this.clickedElementGroup = this.labelClassToNone( this.elements[index].group );

           // Set clickActive temporarily to false, so we can actually changeLabelColor and updateElementInfoAndDesc etc.
           // Then change it back so it doesn't update element info automatically (since user clicked, and we want to not change element info)
           this.clickActive = false;
           this.changeLabelColor(index, "true");
           this.updateElementInfoAndDesc(index);
           this.clickActive = true;

           // Sets colour of all elements in periodic table
           this.setAllElementsColor('');
           this.setElementColorForce(index, "supdark-");
         }
         // What to do if clicking on the same element twice (cancels elementHold)
         else if(this.clickedElementIndex == index) {
           this.clickActive = false;
           this.clickedElementIndex = -1;
           this.clickedElementPeriod = -1;
           this.clickedElementGroup = -1;

           // Sets colour of all elements in periodic tablw
           this.setAllElementsColor('');
           this.setElementColorForce(index, "dark-");
         }
       },
       labelClassToNone: function(labelNumber) {
         return labelNumber.substring(2);
       },
       labelNoneToClass: function(labelNumber, type) {
         // className are the classes that need to be highlighted "p" stands for period, "g" stands for group
         if(type == "period") {
           return "p-" + (labelNumber);
         }
         else if(type == "group") {
           return "g-" + (labelNumber);
         }
       },
       // OUTPUT: Group 1 / Period 7
       getPeriodGroupName: function(type, number) {
         if(type == "period") {
           return "Period " + number;
         }
         else if(type == "group") {
           return "Group " + number;
         }
       },
       periodNotification: function(index) {
        // For now, use Vuesax notifications because they look better (and because ElementUI does not seem to display names properly)
        // Unless one can customize the whites and greys of Vuesax, must move over to ElementUI eventually
        ///*
         this.$vs.notify({
           time: 3000,
           title: this.getPeriodGroupName('period', this.periodLabels[index].display),
           text: this.periodLabels[index].name
         });
         //*/
         /*
         this.$notify({
           title: this.getPeriodGroupName('period', this.periodLabels[index].display),
           message: this.periodLabels[index].name,
           position: 'bottom-right',
           showClose: false
         });
         */
       },
       groupNotification: function(index) {
         ///*
         this.$vs.notify({
           time: 3000,
           title: this.getPeriodGroupName('group', this.groupLabels[index].display),
           text: this.groupLabels[index].name
         });
        //*/

        /*
         this.$notify({
           title: this.getPeriodGroupName('group', this.groupLabels[index].display),
           message: this.groupLabels[index].name,
           position: 'bottom-left',
           showClose: false
         });
        */
       }
     },
     computed: {

     }
   }
</script>
