import { Mod } from './mod.js';
import { BinType } from './bin-type.js';
import { RenderList } from './render-list.js';
import { locations } from './mod-location.js';


export class ModList {
    #mods = [];
    #renderList = new RenderList();

    constructor() {
        for (const location of locations) 
            this.#mods.push(new Mod(location));
    }

    sort(bins, processType, locationFilter) {
        const START_BIN_INDEX = 5;
        const END_BIN_INDEX = 12;

        const filteredMods = this.#mods.filter(mod => mod.area.region === locationFilter);
        console.log(filteredMods);

        for (const mod of filteredMods) {
            const filteredBinsByLocation = bins.filter(bin => bin.startsWith(mod.area.location));
            const binsForLocation = filteredBinsByLocation.map(bin =>  bin.slice(START_BIN_INDEX, END_BIN_INDEX));

            const binTypes = this.#sortBinTypes(binsForLocation);

            mod.bins = binsForLocation.sort();
            mod.processType = processType;
            mod.binTypes = binTypes;
        }
        this.#renderList.render(this.#mods);
    }

    #sortBinTypes(binArray) {
        const binTypes = new BinType();

        const incrementBinCount = binType => {
            var type = {
                'A': () => binTypes.A_Bin++,
                'C': () => binTypes.C_Bin++,
                'E': () => binTypes.E_Bin++,
                'F': () => binTypes.F_Bin++,
                'G': () => binTypes.G_Bin++,
                'H': () => binTypes.H_Bin++,
                'I': () => binTypes.I_Bin++,
                'default' : () => console.log("Error: Unknown bin type. ", binType)
            };
            (type[binType] || type['default'])();
        }

        binArray.forEach(bin => incrementBinCount(bin.charAt(3)));
        return binTypes;
    }
}