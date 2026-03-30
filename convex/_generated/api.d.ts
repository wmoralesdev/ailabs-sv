/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as events from "../events.js";
import type * as events_mcp_internal from "../events_mcp_internal.js";
import type * as http from "../http.js";
import type * as learning_lab from "../learning_lab.js";
import type * as lib_admin from "../lib/admin.js";
import type * as lib_event_content_limits from "../lib/event_content_limits.js";
import type * as lib_event_patch_args from "../lib/event_patch_args.js";
import type * as lib_event_upsert_args from "../lib/event_upsert_args.js";
import type * as lib_list_events_filters from "../lib/list_events_filters.js";
import type * as lib_storage_limits from "../lib/storage_limits.js";
import type * as lib_upsert_event_body from "../lib/upsert_event_body.js";
import type * as migrate_event_descriptions from "../migrate_event_descriptions.js";
import type * as profiles from "../profiles.js";
import type * as r2 from "../r2.js";
import type * as seed from "../seed.js";
import type * as seeded_shuffle from "../seeded_shuffle.js";
import type * as showcase from "../showcase.js";
import type * as sitemap from "../sitemap.js";
import type * as storage from "../storage.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  auth: typeof auth;
  events: typeof events;
  events_mcp_internal: typeof events_mcp_internal;
  http: typeof http;
  learning_lab: typeof learning_lab;
  "lib/admin": typeof lib_admin;
  "lib/event_content_limits": typeof lib_event_content_limits;
  "lib/event_patch_args": typeof lib_event_patch_args;
  "lib/event_upsert_args": typeof lib_event_upsert_args;
  "lib/list_events_filters": typeof lib_list_events_filters;
  "lib/storage_limits": typeof lib_storage_limits;
  "lib/upsert_event_body": typeof lib_upsert_event_body;
  migrate_event_descriptions: typeof migrate_event_descriptions;
  profiles: typeof profiles;
  r2: typeof r2;
  seed: typeof seed;
  seeded_shuffle: typeof seeded_shuffle;
  showcase: typeof showcase;
  sitemap: typeof sitemap;
  storage: typeof storage;
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
