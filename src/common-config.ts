import { InjectionToken } from "@angular/core"

export class CommonConfig {
    baseConfig: any
    azureConfig: any
}
   
export let COMMON_CONFIG = new InjectionToken<CommonConfig>('COMMON_CONFIG')
