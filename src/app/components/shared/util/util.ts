
export class Util {

    constructor() { }

    roundNumber(number, precision): number {
        precision = Math.abs(parseInt(precision)) || 0;
        var multiplier = Math.pow(10, precision);
        return (Math.round(number * multiplier) / multiplier);
    }

}

