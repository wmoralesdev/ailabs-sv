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
import type * as founder_pass from "../founder_pass.js";
import type * as founder_pass_sign_node from "../founder_pass_sign_node.js";
import type * as google_wallet_phase2 from "../google_wallet_phase2.js";
import type * as http from "../http.js";
import type * as learning_lab from "../learning_lab.js";
import type * as lib_admin from "../lib/admin.js";
import type * as lib_event_slug from "../lib/event/slug.js";
import type * as lib_event_content_limits from "../lib/event_content_limits.js";
import type * as lib_event_patch_args from "../lib/event_patch_args.js";
import type * as lib_event_upsert_args from "../lib/event_upsert_args.js";
import type * as lib_founder_lockup_png_b64 from "../lib/founder_lockup_png_b64.js";
import type * as lib_founder_pass_config from "../lib/founder_pass_config.js";
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
  founder_pass: typeof founder_pass;
  founder_pass_sign_node: typeof founder_pass_sign_node;
  google_wallet_phase2: typeof google_wallet_phase2;
  http: typeof http;
  learning_lab: typeof learning_lab;
  "lib/admin": typeof lib_admin;
  "lib/event/slug": typeof lib_event_slug;
  "lib/event_content_limits": typeof lib_event_content_limits;
  "lib/event_patch_args": typeof lib_event_patch_args;
  "lib/event_upsert_args": typeof lib_event_upsert_args;
  "lib/founder_lockup_png_b64": typeof lib_founder_lockup_png_b64;
  "lib/founder_pass_config": typeof lib_founder_pass_config;
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
