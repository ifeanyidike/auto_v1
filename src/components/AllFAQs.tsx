import React from "react";
import FAQCard from "./FAQCard";

const AllFAQs = () => {
  const data = [
    {
      question: "How often should I service my Tesla MV1?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis placeat perspiciatis vero odio ea. Autem animi blanditiis vitae sunt est optio temporibus laboriosam harum ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis placeat perspiciatis vero odio ea. Autem animi blanditiis vitae sunt est optio temporibus laboriosam harum ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis placeat perspiciatis vero odio ea. Autem animi blanditiis vitae sunt est optio temporibus laboriosam harum ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis placeat perspiciatis vero odio ea. Autem animi blanditiis vitae sunt est optio temporibus laboriosam harum ad? ",
    },
    {
      question: "My Sedan car makes some cranky sounds, what should I do?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis placeat perspiciatis vero odio ea. Autem animi blanditiis vitae sunt est optio temporibus laboriosam harum ad?",
    },
    {
      question:
        "My car makes some annoying beeping nice. I have tried several solutions but it doesnt work. What should I do?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis placeat perspiciatis vero odio ea. Autem animi blanditiis vitae sunt est optio temporibus laboriosam harum ad?",
    },
    {
      question: "How regularly should I change oil and oil filter?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis placeat perspiciatis vero odio ea. Autem animi blanditiis vitae sunt est optio temporibus laboriosam harum ad?",
    },
    {
      question:
        "Is it necessary to add a tracker to my vehicle? How should I go about it?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis placeat perspiciatis vero odio ea. Autem animi blanditiis vitae sunt est optio temporibus laboriosam harum ad?",
    },
  ];
  return (
    <>
      {data.map((item, index) => (
        <FAQCard key={index} {...item} />
      ))}
    </>
  );
};

export default AllFAQs;
