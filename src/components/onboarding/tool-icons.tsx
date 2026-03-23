import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrainIcon,
  AiChat02Icon,
  Analytics02Icon,
  CloudServerIcon,
  CodeIcon,
  Coffee01Icon,
  Compass01Icon,
  Database01Icon,
  Handshake,
  MentorIcon,
  Mic01Icon,
  PaintBrushIcon,
  PresentationBarChart02Icon,
  RocketIcon,
  SourceCodeIcon,
  StudentIcon,
  UserGroupIcon,
  UserSearchIcon,
  VisionIcon,
  WorkHistoryIcon,
} from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";

// SVG Logo imports
import { Openai } from "@/components/ui/svgs/openai";
import { OpenaiDark } from "@/components/ui/svgs/openaiDark";
import { AnthropicBlack } from "@/components/ui/svgs/anthropicBlack";
import { AnthropicWhite } from "@/components/ui/svgs/anthropicWhite";
import { CursorLight } from "@/components/ui/svgs/cursor-light";
import { CursorDark } from "@/components/ui/svgs/cursor-dark";
import { Copilot } from "@/components/ui/svgs/copilot";
import { CopilotDark } from "@/components/ui/svgs/copilotDark";
import { V0Light } from "@/components/ui/svgs/v0-light";
import { V0Dark } from "@/components/ui/svgs/v0-dark";
import { StabilityAi } from "@/components/ui/svgs/stabilityAi";
import { Gemini } from "@/components/ui/svgs/gemini";
import { Perplexity } from "@/components/ui/svgs/perplexity";
import { HuggingFace } from "@/components/ui/svgs/huggingFace";
import { Replit } from "@/components/ui/svgs/replit";
import { Vercel } from "@/components/ui/svgs/vercel";
import { VercelDark } from "@/components/ui/svgs/vercel-dark";
import { DarkLightSvg } from "@/components/ui/dark-light-svg";

/**
 * Tool icons mapping (tool ID -> ReactNode)
 * Used for the "AI tools you've explored" section
 */
export const toolIcons: Record<string, ReactNode> = {
  chatgpt: <DarkLightSvg Light={Openai} Dark={OpenaiDark} />,
  claude: <DarkLightSvg Light={AnthropicBlack} Dark={AnthropicWhite} />,
  cursor: <DarkLightSvg Light={CursorLight} Dark={CursorDark} />,
  "github-copilot": <DarkLightSvg Light={Copilot} Dark={CopilotDark} />,
  v0: <DarkLightSvg Light={V0Light} Dark={V0Dark} />,
  midjourney: null, // No logo available on svgl
  "stable-diffusion": <StabilityAi />,
  dalle: <DarkLightSvg Light={Openai} Dark={OpenaiDark} />,
  "openai-api": <DarkLightSvg Light={Openai} Dark={OpenaiDark} />,
  "anthropic-api": (
    <DarkLightSvg Light={AnthropicBlack} Dark={AnthropicWhite} />
  ),
  gemini: <Gemini />,
  perplexity: <Perplexity />,
  langchain: null, // No logo available on svgl
  "hugging-face": <HuggingFace />,
  "replit-ai": <Replit />,
  "vercel-ai-sdk": <DarkLightSvg Light={Vercel} Dark={VercelDark} />,
};

/**
 * Topic icons mapping (topic ID -> ReactNode)
 * Used for the "AI topics that interest you" section
 */
export const topicIcons: Record<string, ReactNode> = {
  "agents-automation": (
    <HugeiconsIcon icon={AiChat02Icon} className="size-4" />
  ),
  "rag-knowledge-bases": (
    <HugeiconsIcon icon={Database01Icon} className="size-4" />
  ),
  "computer-vision": (
    <HugeiconsIcon icon={VisionIcon} className="size-4" />
  ),
  "nlp-llms": (
    <HugeiconsIcon icon={AiBrainIcon} className="size-4" />
  ),
  "voice-audio": (
    <HugeiconsIcon icon={Mic01Icon} className="size-4" />
  ),
  "code-generation": (
    <HugeiconsIcon icon={SourceCodeIcon} className="size-4" />
  ),
  "data-analytics": (
    <HugeiconsIcon icon={Analytics02Icon} className="size-4" />
  ),
  "mlops-infrastructure": (
    <HugeiconsIcon icon={CloudServerIcon} className="size-4" />
  ),
  "product-ux-ai": (
    <HugeiconsIcon icon={PaintBrushIcon} className="size-4" />
  ),
};

/**
 * LookingFor icons mapping (lookingFor ID -> ReactNode)
 * Used for the "What you're looking for" section
 */
export const lookingForIcons: Record<string, ReactNode> = {
  "learning-buddies": (
    <HugeiconsIcon icon={UserGroupIcon} className="size-4" />
  ),
  "project-collaborators": (
    <HugeiconsIcon icon={CodeIcon} className="size-4" />
  ),
  "mentorship-mentee": (
    <HugeiconsIcon icon={StudentIcon} className="size-4" />
  ),
  "mentorship-mentor": (
    <HugeiconsIcon icon={MentorIcon} className="size-4" />
  ),
  "job-opportunities": (
    <HugeiconsIcon icon={WorkHistoryIcon} className="size-4" />
  ),
  "co-founders": (
    <HugeiconsIcon icon={RocketIcon} className="size-4" />
  ),
  "just-exploring": (
    <HugeiconsIcon icon={Compass01Icon} className="size-4" />
  ),
};

/**
 * Availability icons mapping (availability ID -> ReactNode)
 * Used for the "Availability" section
 */
export const availabilityIcons: Record<string, ReactNode> = {
  "coffee-chats": (
    <HugeiconsIcon icon={Coffee01Icon} className="size-4" />
  ),
  collaborations: (
    <HugeiconsIcon icon={Handshake} className="size-4" />
  ),
  speaking: (
    <HugeiconsIcon icon={PresentationBarChart02Icon} className="size-4" />
  ),
  mentoring: (
    <HugeiconsIcon icon={UserSearchIcon} className="size-4" />
  ),
};
