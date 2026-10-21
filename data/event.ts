import type { Prize } from "@/lib/types";

const school = "UIUC";

export type ItineraryItem = { time: string; title: string; detail?: string };

export const event = {
  name: "Disruption Lab × Replit Learnathon",
  shortName: `${school} Learnathon`,
  host: `Disruption Lab @ ${school}`,
  school,
  date: "2026-11-07",
  /** Champaign is on CST (UTC-6) by Nov 7. Used by the countdown and calendar links. */
  start: "2026-11-07T12:00:00-06:00",
  end: "2026-11-07T14:45:00-06:00",
  dateLabel: "Saturday, Nov 7, 2026",
  dateShort: "NOV 2026",
  dateStamp: "11.07",
  time: "12:00 – 2:45 PM",
  location: "CIF Monumental Steps",
  locationDetail: `Campus Instructional Facility, ${school}`,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Campus+Instructional+Facility+University+of+Illinois+Urbana-Champaign",
  replitUrl: "https://replit.com",

  /** Disruption Lab contact links (footer, FAQ, brand chip). */
  links: {
    website: "https://giesgroups.illinois.edu/disruptionlab/home/",
    instagram: "https://www.instagram.com/uiuc_disruption",
    instagramHandle: "@uiuc_disruption",
    linkedin: "https://www.linkedin.com/company/disruption-lab-at-gies/",
  },

  faq: [
    {
      q: "Do I need coding experience?",
      a: "Nope. That's the whole point. You'll learn by building with Replit, from idea to live app.",
    },
    { q: "What should I bring?", a: "A laptop and a charger." },
    {
      q: "Do I need a Replit account?",
      a: "Yes. Make a free one at replit.com before you show up so you can start building right away.",
    },
    { q: "Does it cost anything?", a: "No. It's free." },
    { q: "Who can come?", a: "UIUC only." },
    {
      q: "How do I sign up?",
      a: "Fill out the pre-event form (step 02 above). It's required to attend.",
    },
    {
      q: "How does my project get on the wall?",
      a: "Publish your app on Replit, then submit the post-event form (step 03).",
    },
  ],

  /** Google Form links. null = shows "opens soon". */
  forms: {
    /** Anyone curious. */
    interest:
      "https://docs.google.com/forms/d/e/1FAIpQLSdWY9JC-_ASYPv79J48chio_94pDRlufqLNRCZp-WDXFUINTQ/viewform" as
        | string
        | null,
    /** Required to attend. */
    pre: null as string | null,
    /** Required to get your build on the wall. */
    post: null as string | null,
  },

  /** e.g. { time: "12:00 PM", title: "Kickoff", detail: "Intro to Replit Agent" }. Empty = TBA. */
  itinerary: [] as ItineraryItem[],

  /** e.g. "Pizza + drinks". null = TBA. */
  food: null as string | null,

  /** In display order (Grand Prize first). Set a project's `award` to one of these names. Empty = TBA. */
  prizes: [] as Prize[],
};

/** The form the main "sign up" buttons should point at right now. */
export const signupForm = event.forms.pre ?? event.forms.interest;
