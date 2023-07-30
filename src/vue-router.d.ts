// vue-router.d.ts
declare module 'vue-router' {
    import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
  
    interface RouterOptions {
      routes: RouteRecordRaw[];
    }
  
    export function createRouter(options: RouterOptions): any;
    export function useRouter(): any;
    export function useRoute(): RouteLocationNormalized;
  }
  