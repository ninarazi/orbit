// @flow
import * as React from "react";
import styled, { css } from "styled-components";

import { ItinerarySegmentProvider } from "./context";
import Stack from "../../Stack";
import ItinerarySegmentStatus from "./ItinerarySegmentStatus";
import getSpacingToken from "../../common/getSpacingToken";
import defaultTheme from "../../defaultTheme";

import type { Props } from ".";

const StyledWrapper = styled.div`
  ${({ theme, noElevation }) => css`
    position: relative;
    cursor: pointer;
    margin-bottom: ${getSpacingToken};
    box-shadow: ${!noElevation && theme.orbit.boxShadowFixed};
    border-radius: ${theme.orbit.borderRadiusLarge};
    padding: ${theme.orbit.spaceSmall} 0;
  `}
`;

// $FlowFixMe: https://github.com/flow-typed/flow-typed/issues/3653#issuecomment-568539198
StyledWrapper.defaultProps = {
  theme: defaultTheme,
};

const ItinerarySegment = ({
  status,
  label,
  children,
  spaceAfter,
  dataTest,
  noElevation,
  onClick,
}: Props): React.Node => {
  const content = React.Children.toArray(children);
  const [opened, setOpened] = React.useState(false);

  const parts = content && content.length > 0 && (
    <Stack direction="column">
      {React.Children.map(content, (el, i) => {
        return (
          <ItinerarySegmentProvider
            index={i}
            opened={opened}
            setOpened={() => setOpened(!opened)}
            last={i === content.length - 1}
            isNextHidden={content[i + 1] && content[i + 1].props.hidden}
            count={content.length}
            isHidden={el.props.hidden}
            hasStatus={!!status}
            noElevation={!!noElevation}
          >
            {el}
          </ItinerarySegmentProvider>
        );
      })}
    </Stack>
  );

  const handleClick = (ev: SyntheticEvent<HTMLDivElement>) => {
    if (onClick) onClick(ev);
    setOpened(!opened);
  };

  return (
    <StyledWrapper
      spaceAfter={spaceAfter}
      data-test={dataTest}
      onClick={handleClick}
      noElevation={noElevation}
    >
      {status ? (
        <ItinerarySegmentStatus type={status} label={label}>
          {parts}
        </ItinerarySegmentStatus>
      ) : (
        parts
      )}
    </StyledWrapper>
  );
};

export default ItinerarySegment;
