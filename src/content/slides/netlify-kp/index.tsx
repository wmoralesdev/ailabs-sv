import type { SlideDeckDefinition } from '@/lib/slides/deck-types'
import { NetlifyKpSlide01Cover } from '@/content/slides/netlify-kp/slide-01-cover'
import { NetlifyKpSlide02AiLabs } from '@/content/slides/netlify-kp/slide-02-ai-labs'
import { NetlifyKpSlide03CommunityProof } from '@/content/slides/netlify-kp/slide-03-community-proof'
import { NetlifyKpSlide04CommunityProofContinued } from '@/content/slides/netlify-kp/slide-04-community-proof-continued'
import { NetlifyKpSlide04Opportunity } from '@/content/slides/netlify-kp/slide-04-opportunity'
import { NetlifyKpSlide05Campaign } from '@/content/slides/netlify-kp/slide-05-campaign'
import { NetlifyKpSlide06CityHub } from '@/content/slides/netlify-kp/slide-06-city-hub'
import { NetlifyKpSlide07JuneLaunch } from '@/content/slides/netlify-kp/slide-07-june-launch'
import { NetlifyKpSlide08JulyProof } from '@/content/slides/netlify-kp/slide-08-july-proof'
import { NetlifyKpSlide09Value } from '@/content/slides/netlify-kp/slide-09-value'
import { NetlifyKpSlide10Needs } from '@/content/slides/netlify-kp/slide-10-needs'
import { NetlifyKpSlide11Close } from '@/content/slides/netlify-kp/slide-11-close'

export const netlifyKpDeck: SlideDeckDefinition = {
  id: 'netlify-kp',
  label: 'Build with Netlify · San Salvador',
  slides: [
    NetlifyKpSlide01Cover,
    NetlifyKpSlide02AiLabs,
    NetlifyKpSlide03CommunityProof,
    NetlifyKpSlide04CommunityProofContinued,
    NetlifyKpSlide04Opportunity,
    NetlifyKpSlide05Campaign,
    NetlifyKpSlide06CityHub,
    NetlifyKpSlide07JuneLaunch,
    NetlifyKpSlide08JulyProof,
    NetlifyKpSlide09Value,
    NetlifyKpSlide10Needs,
    NetlifyKpSlide11Close,
  ],
}
