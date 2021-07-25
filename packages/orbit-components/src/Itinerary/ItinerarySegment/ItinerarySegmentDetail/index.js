// @flow
import * as React from "react";
import styled, { css } from "styled-components";

import { left } from "../../../utils/rtl";
import ChevronUp from "../../../icons/ChevronUp";
import ChevronDown from "../../../icons/ChevronDown";
import themeDefault from "../../../defaultTheme";
import Stack from "../../../Stack";
import Text from "../../../Text";
import Slide from "../../../utils/Slide";
import useBoundingRect from "../../../hooks/useBoundingRect";
import randomID from "../../../utils/randomID";
import { usePart } from "../context";
import { useWidth } from "../../context";
import ItineraryIcon from "../ItineraryIcon";

import type { Props } from ".";

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

const StyledInnerWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.orbit.spaceSmall};
  `}
`;

// $FlowFixMe: https://github.com/flow-typed/flow-typed/issues/3653#issuecomment-568539198
StyledInnerWrapper.defaultProps = {
  theme: themeDefault,
};

const StyledSummary = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const StyledDuration = styled.div`
  ${({ minWidth }) => css`
    display: flex;
    justify-content: flex-end;
    min-width: ${minWidth && `${minWidth}px`};
  `}
`;

const StyledExpandable = styled.div`
  ${({ theme }) => css`
    padding: ${theme.orbit.spaceSmall} 0;
    background: ${theme.orbit.paletteCloudLight};
  `}
`;

// $FlowFixMe: https://github.com/flow-typed/flow-typed/issues/3653#issuecomment-568539198
StyledExpandable.defaultProps = {
  theme: themeDefault,
};

const StyledExpandableContent = styled.div`
  ${({ offset }) => css`
    margin-${left}: ${offset + 16}px;
  `}
`;

// $FlowFixMe: https://github.com/flow-typed/flow-typed/issues/3653#issuecomment-568539198
StyledExpandableContent.defaultProps = {
  theme: themeDefault,
};

const ItinerarySegmentDetail = ({ duration, summary, children }: Props): React.Node => {
  const { opened, setOpened, noElevation } = usePart();
  const { calculatedWidth } = useWidth();
  const [{ height }, ref] = useBoundingRect({ height: 0 });

  const slideID = React.useMemo(() => randomID("slideID"), []);
  const labelID = React.useMemo(() => randomID("labelID"), []);

  return (
    <>
      <StyledWrapper>
        <StyledInnerWrapper noElevation={noElevation}>
          <Stack align="center" spacing="small" spaceAfter="small">
            <StyledDuration minWidth={calculatedWidth || 60}>
              <Text weight="bold">{duration}</Text>
            </StyledDuration>
            <ItineraryIcon isDetails />
            <Stack justify="center" shrink direction="column" spacing={opened ? "medium" : "none"}>
              <StyledSummary>{summary}</StyledSummary>
            </Stack>
            {opened ? <ChevronUp /> : <ChevronDown />}
          </Stack>
        </StyledInnerWrapper>
        <Slide maxHeight={height} expanded={opened} id={slideID} ariaLabelledBy={labelID}>
          <StyledExpandable ref={ref} onClick={setOpened}>
            <StyledExpandableContent offset={calculatedWidth}>{children}</StyledExpandableContent>
          </StyledExpandable>
        </Slide>
      </StyledWrapper>
    </>
  );
};

export default ItinerarySegmentDetail;
