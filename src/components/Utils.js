import React from 'react';
import { LIGHT_GREY, BLACK, YELLOW, WHITE } from '../Constants';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&::before, &::after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

export const Line = () => {
  return (
    <div style={{ height: 1, width: "auto", backgroundColor: "grey" }}></div>
  );
};

export const Heading1 = ({ text }) => {
  return <div style={{ fontSize: 22, fontWeight: "bold" }}>{text}</div>;
};

export const Heading2 = ({ text }) => {
  return <div style={{ fontSize: 18, fontWeight: "bold" }}>{text}</div>;
};

export const AuxDescription = ({ heading, body, outline }) => {
  outline = outline != null ? outline : true;
  var borderWidth = 1;
  var padding = 10;

  if (!outline) {
    borderWidth = 0;
    padding = 0;
  }

  return (
    <div
      style={{
        height: "auto",
        width: "auto",
        border: `${LIGHT_GREY} ${borderWidth}px solid`,
        padding: padding,
        borderRadius: 10,
      }}
    >
      <Heading2 text={heading} />
      <p>{body}</p>
    </div>
  );
};

export const FatButton = ({
  name,
  redirectTo,
  fillColor,
  fontColor,
  fontWeight,
  width,
  outline,
}) => {
  const navigate = useNavigate();
  fillColor = fillColor != null ? fillColor : YELLOW;
  fontColor = fontColor != null ? fontColor : WHITE;
  fontWeight = fontWeight != null ? fontWeight : "normal";
  width = width != null ? width : "100%";
  outline = outline != null ? outline : fillColor;

  return (
    <div style={{ width: width, margin: "auto" }}>
      <Button
        onClick={() => {
          const params = {}; // for sending parameters
          navigate(redirectTo, { state: params });
        }}
        style={{
          color: fontColor,
          width: width,
          backgroundColor: fillColor,
          padding: 20,
          borderRadius: 20,
          fontWeight: fontWeight,
          borderColor: outline,
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        {name}
      </Button>
    </div>
  );
};

export const PrimaryFatButton = ({ name, redirectTo }) => {
  return <FatButton name={name} redirectTo={redirectTo} fontWeight={"bold"} />;
};

export const SecFatButton = ({ name, redirectTo }) => {
  return (
    <FatButton
      name={name}
      redirectTo={redirectTo}
      fillColor={WHITE}
      outline={LIGHT_GREY}
      fontColor={BLACK}
      fontWeight={"light"}
    />
  );
};
