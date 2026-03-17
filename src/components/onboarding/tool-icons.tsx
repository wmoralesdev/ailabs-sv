import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrainIcon,
  Analytics02Icon,
  CloudServerIcon,
  CodeIcon,
  Coffee01Icon,
  Compass01Icon,
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
  Database01Icon,
  AiChat02Icon,
} from "@hugeicons/core-free-icons";

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

/**
 * Wrapper for dark/light mode SVG components
 */
function DarkLightIcon({
  light,
  dark,
}: {
  light: ReactNode;
  dark: ReactNode;
}) {
  return (
    <>
      <span className="dark:hidden">{light}</span>
      <span className="hidden dark:block">{dark}</span>
    </>
  );
}

/**
 * Tool icons mapping (tool ID -> ReactNode)
 * Used for the "AI tools you've explored" section
 */
export const toolIcons: Record<string, ReactNode> = {
  chatgpt: <DarkLightIcon light={<Openai />} dark={<OpenaiDark />} />,
  claude: <DarkLightIcon light={<AnthropicBlack />} dark={<AnthropicWhite />} />,
  cursor: <DarkLightIcon light={<CursorLight />} dark={<CursorDark />} />,
  "github-copilot": <DarkLightIcon light={<Copilot />} dark={<CopilotDark />} />,
  v0: <DarkLightIcon light={<V0Light />} dark={<V0Dark />} />,
  midjourney: null, // No logo available on svgl
  "stable-diffusion": <StabilityAi />,
  dalle: <DarkLightIcon light={<Openai />} dark={<OpenaiDark />} />,
  "openai-api": <DarkLightIcon light={<Openai />} dark={<OpenaiDark />} />,
  "anthropic-api": <DarkLightIcon light={<AnthropicBlack />} dark={<AnthropicWhite />} />,
  gemini: <Gemini />,
  perplexity: <Perplexity />,
  langchain: null, // No logo available on svgl
  "hugging-face": <HuggingFace />,
  "replit-ai": <Replit />,
  "vercel-ai-sdk": <DarkLightIcon light={<Vercel />} dark={<VercelDark />} />,
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
