import * as React from "react";

import { SpaceAfter } from "../../common/common";

export type Statuses = "warning" | "critical" | "info" | "success";

export interface Props extends SpaceAfter {
  readonly type: Statuses;
  readonly label?: React.ReactNode;
  readonly offset?: number;
  readonly children: React.ReactNode;
}

declare const ItineraryPartStatuses: React.FunctionComponent<Props>;
export default ItineraryPartStatuses;
