import React from "react";
import { default as OfferCardComponent } from "/src/components/offer/OfferCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Offer/Offer Card",
  component: OfferCardComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <OfferCardComponent {...args} />;

export const OfferCard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
OfferCard.args = {
  name: "Anabeth Chase",
  avatar:
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1096&q=80",
  lastUpdate: "2 minutes ago",
  taskTitle: "Photo Editing",
  taskLink: "#",
  details:
    "I am currently looking for a photo editor for my sisters birthday, if you are interested.",
};
