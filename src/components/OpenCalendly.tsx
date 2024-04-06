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
  //   https://calendly.com/ifeanyidike/follow-up-meeting

  return (
    <Button {...rest} onClick={showCalendly}>
      {!props.calendlyLink ? (
        <a
          href={
            !props.calendlyLink ? `tel:${props.phoneNo}` : props.calendlyLink
          }
          target={props.calendlyLink ? '_blank' : '_self'}
        ></a>
      ) : (
        props.text
      )}
    </Button>
  );
};

export default OpenCalendly;
