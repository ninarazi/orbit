// @flow
import * as React from "react";
import { text, boolean } from "@storybook/addon-knobs";

import Wifi from "../icons/Wifi";
import PowerPlug from "../icons/PowerPlug";
import Entertainment from "../icons/Entertainment";
import Seat from "../icons/Seat";
import Info from "../icons/InformationCircle";
import Airplane from "../icons/AirplaneUp";
import Stack from "../Stack";
import CarrierLogo from "../CarrierLogo";
import Badge from "../Badge";
import { BadgeListItem } from "../BadgeList";
import AlertCircle from "../icons/AlertCircle";
import Guarantee from "../icons/KiwicomGuarantee";

import Itinerary, {
  ItinerarySegment,
  ItineraryBadgeList,
  ItinerarySegmentDetail,
  ItinerarySegmentStop,
  ItineraryStatus,
} from ".";

const BadgeGroup = () => {
  const carrier = [{ code: "FR", name: "Ryanair" }];

  return (
    <Stack inline align="center" spacing="medium">
      <CarrierLogo size="medium" carriers={carrier} />
      <Badge icon={<Airplane />} />
      <Badge>1 stop</Badge>
    </Stack>
  );
};

const content = [
  {
    heading: "Connection Info",
    items: [
      {
        icon: <Airplane size="small" />,
        text: "Carrier",
        additional: "Ryanair",
      },
      {
        icon: <Info size="small" />,
        text: "Connection number",
        additional: "RA 8345",
      },
    ],
  },
  {
    heading: "Seating Info",
    items: [
      {
        icon: <Seat size="small" />,
        text: "Seat pitch",
        additional: "76cm",
      },
      {
        icon: <Seat size="small" />,
        text: "Seat width",
        additional: "43cm",
      },
      {
        icon: <Seat size="small" />,
        text: "Seat recline",
        additional: "7cm",
      },
      {
        icon: <Entertainment size="small" />,
        text: "Audio & video on demand",
        additional: "No",
      },
      {
        icon: <PowerPlug size="small" />,
        text: "In-seat power",
        additional: "No",
      },
      {
        icon: <Wifi size="small" />,
        text: "Wi-Fi on board",
        additional: "No",
      },
    ],
  },
];

export const Segment = (): React.Node => {
  return (
    <Itinerary>
      <ItinerarySegment>
        <ItinerarySegmentStop
          city="Prague"
          station="Václav Havel Airport Prague (PRG)"
          date="Fri, 19.10"
          time="14:05"
        />
        <ItinerarySegmentDetail duration="2h 30m" summary={<BadgeGroup />} content={content} />
        <ItinerarySegmentStop
          city="Milan"
          station="Milan Bergamo International Airport (BGY)"
          date="Fri, 19.10"
          time="16:35"
        />
      </ItinerarySegment>
    </Itinerary>
  );
};

export const Status = (): React.Node => {
  return (
    <Itinerary>
      <ItineraryStatus type="critical" label="Rescheduled · 4h later" spaceAfter="medium">
        <ItinerarySegment noElevation>
          <ItinerarySegmentStop
            city="Prague"
            station="Václav Havel Airport Prague (PRG)"
            date="Fri, 19.10"
            time="14:05"
          />
          <ItinerarySegmentDetail duration="2h 30m" summary={<BadgeGroup />} content={content} />
          <ItinerarySegmentStop
            city="Vienna"
            station="Vienna International Airport"
            date="Fri, 19.10"
            time="15:35"
          />
        </ItinerarySegment>
      </ItineraryStatus>
      <ItineraryBadgeList>
        <BadgeListItem icon={<AlertCircle />}>The layover in Vienna is too short</BadgeListItem>
      </ItineraryBadgeList>
      <ItineraryStatus type="warning" label="Affected connection">
        <ItinerarySegment noElevation>
          <ItinerarySegmentStop
            city="Vienna"
            station="Vienna International Airport"
            date="Fri, 19.10"
            time="18:15"
          />
          <ItinerarySegmentDetail duration="2h 30m" summary={<BadgeGroup />} content={content} />
          <ItinerarySegmentStop
            city="Milan"
            station="Milan Bergamo International Airport (BGY)"
            date="Fri, 19.10"
            time="19:20"
          />
        </ItinerarySegment>
      </ItineraryStatus>
    </Itinerary>
  );
};

export const Stop = (): React.Node => {
  const date = text("date", "Fr, 19.10");
  const time = text("time", "14:05");
  const station = text("place", "Václav Havel Airport Prague (PRG)");
  const city = text("city", "Prague");
  const warning = boolean("warning", false);

  return (
    <ItinerarySegmentStop city={city} station={station} date={date} time={time} warning={warning} />
  );
};

export const Detail = (): React.Node => {
  return (
    <ItinerarySegment noElevation>
      <ItinerarySegmentDetail duration="2h 30m" summary={<BadgeGroup />} content={content} />
    </ItinerarySegment>
  );
};

export const Default = (): React.Node => {
  return (
    <Itinerary>
      <ItinerarySegment>
        <ItinerarySegmentStop
          city="Moscow"
          station="Sheremetyevo International Airport (SVO)"
          date="Fri, 19.10"
          time="14:05"
        />
        <ItinerarySegmentDetail duration="2h 30m" summary={<BadgeGroup />} content={content} />
        <ItinerarySegmentStop
          city="Prague"
          station="Václav Havel Airport Prague (PRG)"
          date="Fri, 19.10"
          time="16:35"
        />
      </ItinerarySegment>
      <ItineraryBadgeList>
        <BadgeListItem icon={<Guarantee />}>
          Connection protected by the Kiwi.com Guarantee
        </BadgeListItem>
      </ItineraryBadgeList>
      <ItinerarySegment spaceAfter="large">
        <ItinerarySegmentStop
          city="Prague"
          station="Václav Havel Airport Prague (PRG)"
          date="Sat, 20.10"
          time="11:05"
        />
        <ItinerarySegmentDetail duration="2h 30m" summary={<BadgeGroup />} content={content} />
        <ItinerarySegmentStop
          city="Milan"
          station="Milan Bergamo International Airport (BGY)"
          date="Fri, 20.10"
          time="16:35"
        />
      </ItinerarySegment>
    </Itinerary>
  );
};

export default {
  title: "Itinerary",
  component: Itinerary,
  includeStories: ["Default", "Status", "Segment", "Stop", "Detail"],
};
