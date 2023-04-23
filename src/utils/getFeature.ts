import featurePrompt from '@/prompt';

import type { PromptSchemaType } from '@/prompt/base';

export type FeatureCategory = PromptSchemaType & { id: string };

export function getFeatureCategory(featureCategory: PromptSchemaType['featureCategory']) {
    const list = Object.keys(featurePrompt)
        .map((key) => {
            // @ts-ignore
            return { ...featurePrompt[key], id: key } as FeatureCategory;
        })
        .filter((item) => item.featureCategory === featureCategory);
    return list;
}
