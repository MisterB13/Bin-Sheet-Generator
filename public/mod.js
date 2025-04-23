import { BinType } from "./bin-type.js"; 
import { ModLocation } from "./mod-location.js";


export class Mod {
    area = new ModLocation();
    static totalCount;
    processType;
    bins = [];
    binTypes = new BinType();

    get bins() { return this.bins; }

    constructor(area) { this.area = area; }
}
