'use client';

import { useState } from 'react';

interface ReadMoreProps {
  text: string;
  maxLength: number;
}

const ReadMore = (props: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <p>
        {isExpanded || props.text.length <= props.maxLength
          ? props.text
          : `${props.text.substring(0, props.maxLength)}...`}
        {props.text.length > props.maxLength && (
          <span
            onClick={toggleReadMore}
            className="font-bold text-blue-950 cursor-pointer"
          >
            {isExpanded ? ' Show Less' : ' Read more'}
          </span>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
