class Time{
    /**
     * yyyymmdd to Date
     */
    static stod(s: string){
        return new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6)}`);
    }

    /**
     * Date to yyyymmdd
     */
    static dtos(d: Date){
        return d.toISOString().slice(0, 10).replace(/-/g, '');
    }

    /**
     * ms to day
     */
    static itod(i: number){
        return i / 864000;
    }

    /**
     * add day to Date
     */
    static add(d: Date, ndays: number){
        d.setDate(d.getDate() + ndays);
        return d;
    }
}
