import React from "react";

import Common from "../../common/common";

export type Statuses = "warning" | "critical" | "info" | "success";

export interface Props extends Common.SpaceAfter {
  /** Type of the status  */
  readonly type: Statuses;
  /** Label of the status */
  readonly label?: React.ReactNode;
  /** Offset for the label text */
  readonly offset?: number;
  /** Content of the status */
  readonly children: React.ReactNode;
}

declare const ItineraryPartStatuses: React.FunctionComponent<Props>;
export default ItineraryPartStatuses;
