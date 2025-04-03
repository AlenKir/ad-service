import {useMemo} from "react";

export const useSortedAds = (ads, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...ads].sort(
                (a, b) => a[sort].localeCompare(b[sort]));
        }
        return ads;
    }, [ads, sort]);
}

export const useAds = (ads, sort, query) => {
    const sortedAds = useSortedAds(ads, sort);

    return useMemo(() => {
        query = query.toLowerCase();

        return sortedAds.filter(ad =>
            ad.title.toLowerCase().includes(query)
            || ad.descr.toLowerCase().includes(query)
            || ad.body.toLowerCase().includes(query));
    }, [query, sortedAds]);
}