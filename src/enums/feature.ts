const colorEnum = {
    1: 'rgb(22, 129, 255)'
};

const develop = [
    {
        id: 'genVarNameFromDesc',
        name: '命名工具',
        icon: '命',
        color: colorEnum[1]
    }
];

export type FeatureType = {
    id: string;
    name: string;
    icon: string;
    color?: string;
};

export const featureEnum = {
    develop
};
