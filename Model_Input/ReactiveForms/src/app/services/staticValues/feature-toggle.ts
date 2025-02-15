import { InjectionToken } from "@angular/core";

export interface FeatureToggle {
    featureA: boolean;
    featureB: boolean;
}

export const FEATURE_TOGGLES: FeatureToggle = {
    featureA: true,
    featureB: false
}

export const APP_FEATURETOGGLE = new InjectionToken<FeatureToggle>('FeatureToggleSettings');