export class ModLocation {
    location;
    region;

    constructor(location, region) {
        this.location = location;
        this.region = region;
    }
}

export const locations = [
    new ModLocation('P-1-A','West'),
    new ModLocation('P-1-B','West'),
    new ModLocation('P-1-L','East'),
    new ModLocation('P-1-M','East'),
    new ModLocation('P-1-P','East'),
    // new ModLocation('P-1-F','East'),
];
