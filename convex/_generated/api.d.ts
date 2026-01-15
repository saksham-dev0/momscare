/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as adminMutations from "../adminMutations.js";
import type * as adminQueries from "../adminQueries.js";
import type * as doctors from "../doctors.js";
import type * as doctorsMutations from "../doctorsMutations.js";
import type * as emailService from "../emailService.js";
import type * as nurses from "../nurses.js";
import type * as nursesMutations from "../nursesMutations.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  adminMutations: typeof adminMutations;
  adminQueries: typeof adminQueries;
  doctors: typeof doctors;
  doctorsMutations: typeof doctorsMutations;
  emailService: typeof emailService;
  nurses: typeof nurses;
  nursesMutations: typeof nursesMutations;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
