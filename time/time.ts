class Time{
    /**
     * yyyymmdd to Date
     */
    public stod(s: string){
        return new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6)}`);
    }

    /**
     * Date to yyyymmdd
     */
    public dtos(d: Date){
        return d.toISOString().slice(0, 10).replace(/-/g, '');
    }

    /**
     * ms to day
     */
    public itod(i: number){
        return i / 86400000;
    }

    /**
     * add day to Date
     */
    public add(d: Date, ndays: number){
        d.setDate(d.getDate() + ndays);
        return d;
    }
}
