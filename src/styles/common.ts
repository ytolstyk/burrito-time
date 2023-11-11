import styled from "styled-components/native";
import { baseMult } from "./mixins";
import { colors } from "./colors";
import { themes } from "./constants";
import type * as CSS from "csstype";

type FlexProps = {
  flex?: CSS.Property.Flex;
  flexWrap?: CSS.Property.FlexWrap;
  flexDirection?: CSS.Property.FlexDirection;
  alignItems?: CSS.Property.AlignItems;
  justifyContent?: CSS.Property.JustifyContent;
}

export const Flex = styled.View<FlexProps>`
  ${(props) => {
    if (props.flex) {
      return `flex: ${props.flex};`;
    }
  }}

  ${(props) => {
    if (props.flexDirection) {
      return `flex-direction: ${props.flexDirection};`;
    }
  }}

  ${(props) => {
    if (props.justifyContent) {
      return `justify-content: ${props.justifyContent};`;
    }
  }}

  ${(props) => {
    if (props.alignItems) {
      return `align-items: ${props.alignItems};`;
    }
  }}

  ${(props) => {
    if (props.flexWrap) {
      return `flex-wrap: ${props.flexWrap};`;
    }
  }}
`;

const sidePadding = baseMult(1);

type ContainerProps = {
  alignItems?: CSS.Property.AlignItems;
  justifyContent?: CSS.Property.JustifyContent;
};

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${colors.white};
  padding-bottom: ${baseMult(2)};
  padding-left: ${sidePadding};
  padding-right: ${sidePadding};

  ${(props) => {
    if (props.theme.name === themes.dark) {
      return `background-color: ${colors.darkGrey};`;
    }
  }}
`;

type MarginProps = {
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
};

export const Margin = styled.View<MarginProps>`
  ${(props) => (props.top ? `margin-top: ${baseMult(props.top)};` : "")}
  ${(props) =>
    props.bottom ? `margin-bottom: ${baseMult(props.bottom)};` : ""}
  ${(props) => (props.right ? `margin-right: ${baseMult(props.right)};` : "")}
  ${(props) => (props.left ? `margin-left: ${baseMult(props.left)};` : "")}
`;

const sectionMargin = baseMult(1.5);

export const Section = styled.View`
  padding-bottom: ${sectionMargin};
  margin-bottom: ${sectionMargin};
  border-bottom-color: ${colors.lightGrey};
  border-bottom-width: 1px;
  margin-top: ${sectionMargin};
`;
