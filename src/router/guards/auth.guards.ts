import type { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from "vue-router"
import { getStoredToken } from "../../utils/auth.storage"

export function guardsTo(to: RouteLocationNormalizedGeneric, _from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext): void {
    const isAuth = getStoredToken()

    if (to.name !== 'login' && !isAuth) {
        next("/login")
    } else {
        next()
    }
}