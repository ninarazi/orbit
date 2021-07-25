import * as React from "react";

import { SpaceAfter } from "../../common/common";
import { Props as BadgeListProps } from "../../BadgeList";

export interface Props extends BadgeListProps, SpaceAfter {
  readonly children: React.ReactNode;
}

declare const ItineraryBadgeList: React.FunctionComponent<Props>;
export default ItineraryBadgeList;
