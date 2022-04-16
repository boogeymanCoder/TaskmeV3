import React from "react";
import { default as ServiceCardComponent } from "/src/components/service/ServiceCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Service/Service Card",
  component: ServiceCardComponent,
  argTypes: {
    onEdit: { action: "onEdit" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ServiceCardComponent {...args} />;

export const ServiceCard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ServiceCard.args = {
  avatar:
    "https://images.unsplash.com/photo-1608415389300-d15691405dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  owner: "Percy Jackson",
  lastUpdated: "2 days ago",
  title: "Photo Editing",
  details:
    "I have 5 years of experience in photo editing utilizing wide arsenal of photo editing software.",
  tags: ["photoEditing", "PhotoShop"],
  currency: "PHP",
  price: 67.32,
};
