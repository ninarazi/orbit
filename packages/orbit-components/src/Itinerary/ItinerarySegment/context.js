// @flow
import * as React from "react";

import type { Context, ProviderProps } from "./context";

export const ItinerarySegmentContext: React.Context<Context> = React.createContext({
  isNextHidden: false,
  isHidden: false,
  noElevation: false,
  opened: false,
  setOpened: () => {},
  index: 0,
  count: 0,
  last: false,
});

export const ItinerarySegmentProvider = ({
  children,
  index,
  last,
  count,
  opened,
  setOpened,
  isNextHidden,
  isHidden,
  noElevation,
}: ProviderProps): React.Node => {
  return (
    <ItinerarySegmentContext.Provider
      value={{
        index,
        last,
        noElevation,
        isNextHidden,
        isHidden,
        opened,
        setOpened,
        count,
      }}
    >
      {children}
    </ItinerarySegmentContext.Provider>
  );
};

export const usePart = (): Context => React.useContext(ItinerarySegmentContext);
