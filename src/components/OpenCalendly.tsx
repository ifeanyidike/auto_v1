'use client';
import React from 'react';
import Button from './Button';

type Props = {
  calendlyLink?: string | null;
  phoneNo: string;
  text: string;
  rest: Record<string, any>;
};
const OpenCalendly = (props: Props) => {
  const { rest = {} } = props;
  const showCalendly = () => {
    if (!props.calendlyLink) return;
    window.Calendly?.initPopupWidget({
      url: props.calendlyLink,
    });
  };

  return (
    <Button {...rest} onClick={showCalendly}>
      {!props.calendlyLink ? (
        <a href={`tel:${props.phoneNo}`}>{props.text}</a>
      ) : (
        props.text
      )}
    </Button>
  );
};

export default OpenCalendly;
