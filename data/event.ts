import type { Prize } from "@/lib/types";

const school = "UIUC";

export type ItineraryItem = { time: string; title: string; detail?: string };

export const event = {
  name: "Disruption Lab × Replit Learnathon",
  shortName: `${school} Learnathon`,
  host: `Disruption Lab @ ${school}`,
  school,
  date: "2026-11-07",
  dateLabel: "Saturday, Nov 7, 2026",
  dateShort: "NOV 2026",
  dateStamp: "11.07",
  time: "12:00 – 2:45 PM",
  location: "CIF Monumental Steps",
  locationDetail: `Campus Instructional Facility, ${school}`,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Campus+Instructional+Facility+University+of+Illinois+Urbana-Champaign",
  replitUrl: "https://replit.com",

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
