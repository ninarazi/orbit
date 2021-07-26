// @flow
import * as React from "react";
import styled, { css } from "styled-components";

import { left } from "../../utils/rtl";
import Alert from "../../icons/Alert";
import Warning from "../../icons/AlertCircle";
import Info from "../../icons/InformationCircle";
import Check from "../../icons/CheckCircle";
import Text from "../../Text";
import Stack from "../../Stack";
import defaultTheme from "../../defaultTheme";
import type { ThemeProps } from "../../defaultTheme";
import { STATUSES } from "./consts";
import getSpacingToken from "../../common/getSpacingToken";

import type { Statuses, Props } from ".";

const resolveColor = (status: Statuses, isHeader?: boolean) => ({ theme }: ThemeProps) => {
  const border = {
    [STATUSES.WARNING]: theme.orbit.colorTextWarning,
    [STATUSES.CRITICAL]: theme.orbit.colorTextCritical,
    [STATUSES.INFO]: theme.orbit.colorTextInfo,
    [STATUSES.SUCCESS]: theme.orbit.colorTextSuccess,
  };

  const header = {
    [STATUSES.WARNING]: theme.orbit.paletteOrangeLight,
    [STATUSES.INFO]: theme.orbit.paletteBlueLight,
    [STATUSES.CRITICAL]: theme.orbit.paletteRedLight,
    [STATUSES.SUCCESS]: theme.orbit.paletteGreenLight,
  };

  if (isHeader) return header[status];

  return border[status];
};

const StyledWrapper = styled.div`
  ${({ theme, type }) => css`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
    border-radius: ${theme.orbit.borderRadiusLarge};
    border-${left}: ${theme.orbit.borderRadiusNormal} solid ${type && resolveColor(type)};
    box-shadow: ${theme.orbit.boxShadowFixed};
    margin-bottom: ${getSpacingToken};
    `}
`;

// $FlowFixMe: https://github.com/flow-typed/flow-typed/issues/3653#issuecomment-568539198
StyledWrapper.defaultProps = {
  theme: defaultTheme,
};

const StyledStatusHeader = styled.div`
  ${({ theme, type }) => css`
    display: flex;
    align-items: center;
    padding: 0 ${theme.orbit.spaceXSmall};
    height: 32px;
    border-radius: ${theme.orbit.borderRadiusNormal} ${theme.orbit.borderRadiusLarge} 0 0;
    background: ${type && resolveColor(type, true)};
  `}
`;

// $FlowFixMe: https://github.com/flow-typed/flow-typed/issues/3653#issuecomment-568539198
StyledStatusHeader.defaultProps = {
  theme: defaultTheme,
};

// calculatedOffset + paddings
const StyledStatusText = styled.div`
  z-index: 2;
  margin-${left}: ${({ theme }) => theme.orbit.spaceSmall};
`;

// $FlowFixMe: https://github.com/flow-typed/flow-typed/issues/3653#issuecomment-568539198
StyledStatusText.defaultProps = {
  theme: defaultTheme,
};

const StatusIcon = ({ type }: {| type: Statuses |}) => {
  switch (type) {
    case "info":
      return <Info size="small" color={type} />;
    case "critical":
      return <Alert size="small" color={type} />;
    case "success":
      return <Check size="small" color={type} />;
    default:
      return <Warning size="small" color={type} />;
  }
};

const ItineraryStatus = ({
  type,
  label,
  spaceAfter = "medium",
  children,
  offset,
}: Props): React.Node => {
  return (
    <StyledWrapper type={type} spaceAfter={spaceAfter}>
      <StyledStatusHeader type={type}>
        {/* TODO: replace icons with octagon */}
        <StyledStatusText offset={offset}>
          <Stack inline spacing="XSmall" align="center">
            <StatusIcon type={type} />
            {label && <Text type={type}>{label}</Text>}
          </Stack>
        </StyledStatusText>
      </StyledStatusHeader>
      {children}
    </StyledWrapper>
  );
};

export default ItineraryStatus;
