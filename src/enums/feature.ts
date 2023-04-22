export type FeatureType = {
    id: string;
    name: string;
    icon: string;
    color?: string;
};

const colorEnum = {
    1: 'rgb(22, 129, 255)',
    2: 'rgb(251, 190, 35)',
    3: 'rgb(252, 69, 72)',
    4: 'rgb(163, 221, 185)',
    5: 'rgb(2, 51, 115)',
    6: 'rgb(200, 172, 112)'
};

const develop = [
    {
        id: 'genVarNameFromDesc',
        name: '命名工具',
        icon: '命',
        color: colorEnum[1]
    },
    {
        id: 'gitCmt',
        name: 'git commit',
        icon: 'G',
        color: colorEnum[2]
    }
];

const other = [
    {
        id: 'generateDaily',
        name: '日报生成',
        icon: '日',
        color: colorEnum[1]
    }
];

export const featureEnum = {
    develop,
    other
};
