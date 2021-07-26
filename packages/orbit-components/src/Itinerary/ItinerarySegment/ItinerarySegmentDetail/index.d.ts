import * as React from "react";

/** DOCS:
  ItineraryPartDetail serves as connection between two ItineraryPartPlace components (segments)
*/

interface Detail {
  icon: React.ReactNode;
  text: React.ReactNode;
  additional: React.ReactNode;
}
interface ContentItem {
  heading: React.ReactNode;
  items: Detail[];
}

export interface Props {
  /** The content of ItineraryDetail component, when it's not expanded */
  readonly summary: React.ReactNode;
  /** The duration between two Itinerary parts  */
  readonly content: ContentItem[];
  readonly duration: string;
  /** The content of ItineraryDetail component, shown when it's expanded */
  /** default: <Airplane /> */
  readonly icon?: React.ReactNode;
}

declare const ItineraryPartDetail: React.FunctionComponent<Props>;
export default ItineraryPartDetail;
