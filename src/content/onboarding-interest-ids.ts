/**
 * Canonical stable IDs for onboarding interest options.
 * IDs are shared across locales; labels are localized in site-content.
 */
export const INTEREST_IDS = [
  "agents-automation",
  "rag-knowledge-bases",
  "computer-vision",
  "nlp-llms",
  "voice-audio",
  "code-generation",
  "data-analytics",
  "mlops-infrastructure",
  "product-ux-ai",
] as const;

export const TOOL_IDS = [
  "chatgpt",
  "claude",
  "cursor",
  "github-copilot",
  "v0",
  "midjourney",
  "stable-diffusion",
  "dalle",
  "openai-api",
  "anthropic-api",
  "gemini",
  "perplexity",
  "langchain",
  "hugging-face",
  "replit-ai",
  "vercel-ai-sdk",
] as const;

export const LOOKING_FOR_IDS = [
  "learning-buddies",
  "project-collaborators",
  "mentorship-mentee",
  "mentorship-mentor",
  "job-opportunities",
  "co-founders",
  "just-exploring",
] as const;

export const AVAILABILITY_IDS = [
  "coffee-chats",
  "collaborations",
  "speaking",
  "mentoring",
] as const;

export type InterestId = (typeof INTEREST_IDS)[number];
export type ToolId = (typeof TOOL_IDS)[number];
export type LookingForId = (typeof LOOKING_FOR_IDS)[number];
export type AvailabilityId = (typeof AVAILABILITY_IDS)[number];
