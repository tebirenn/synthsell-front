import { AdCreateInterface } from '@app/interfaces/ad.interface';

export class GetAllAds {
    static readonly type = '[Ads] GetAllAds';

    constructor() {}
}

export class GetAllCities {
    static readonly type = '[Ads] GetAllCities';

    constructor() {}
}

export class GetAllCategories {
    static readonly type = '[Ads] GetAllCategories';

    constructor() {}
}

export class AdCreate {
    static readonly type = '[Ads] AdCreate';

    constructor(public dto: AdCreateInterface) {}
}
