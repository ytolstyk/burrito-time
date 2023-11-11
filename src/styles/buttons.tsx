import React, { ReactElement } from "react";
import styled from "styled-components/native";
import { colors } from "./colors";
import { baseMult } from "./mixins";
import { Pressable, PressableProps } from "react-native";
import { lighten } from "polished";

export const LinkButtonWrapper = styled.Pressable`
  background-color: transparent;
  padding: ${baseMult(1 / 2)};
`;

export const LinkButtonText = styled.Text`
  color: ${colors.purple};
  text-decoration: underline;
`;

export function LinkButton(
  props: PressableProps & { children: string | number | null }
) {
  return (
    <LinkButtonWrapper {...props}>
      <LinkButtonText>{props.children}</LinkButtonText>
    </LinkButtonWrapper>
  );
}

type RoundButtonProps = {
  size?: "large" | "medium" | "small";
  color: keyof typeof colors;
  pressed?: boolean;
  label?: string | number;
} & PressableProps;

export const RoundButtonBackground = styled.View<RoundButtonProps>`
  ${(props) => {
    switch (props.size) {
      case "large":
        return `
          width: ${baseMult(10)};
          height: ${baseMult(10)};
        `;

      case "medium":
        return `
          width: ${baseMult(7)};
          height: ${baseMult(7)};
        `;

      case "small":
        return `
          width: ${baseMult(5)};
          height: ${baseMult(5)};
        `;

      default:
        return `
          width: ${baseMult(7)};
          height: ${baseMult(7)};
        `;
    }
  }};

  padding: ${baseMult(1)};
  border-radius: ${baseMult(10)};
  align-items: center;
  justify-content: center;
  background-color: transparent;

  ${({ color, pressed }) => {
    const finalColor = pressed ? lighten(0.2, colors[color]) : colors[color];

    return `
      background-color: ${finalColor};
    `;
  }};
`;

export const RoundButtonText = styled.Text<RoundButtonProps>`
  color: ${colors.white};
  text-align: center;
  font-size: 24px;

  ${(props) => {
    switch (props.size) {
      case "large":
        return "font-size: 24px;";

      case "medium":
        return "font-size: 18px";

      case "small":
        return "font-size: 14px";

      default:
        return "font-size: 18px";
    }
  }};
`;

export function RoundButton(
  props: RoundButtonProps & { children?: string | number | null | ReactElement }
) {
  function renderInnerButton(pressed: boolean) {
    if (props.label) {
      return (
        <RoundButtonText {...props} pressed={pressed}>
          {props.label}
        </RoundButtonText>
      );
    }

    if (props.children) {
      return props.children;
    }

    return null;
  }

  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <RoundButtonBackground {...props} pressed={pressed}>
          {renderInnerButton(pressed)}
        </RoundButtonBackground>
      )}
    </Pressable>
  );
}
