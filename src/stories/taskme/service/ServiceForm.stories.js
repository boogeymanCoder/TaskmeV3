import React from "react";
import { default as ServiceFormComponent } from "/src/components/service/ServiceForm";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Service/Service Form",
  component: ServiceFormComponent,
  argTypes: {
    onClose: { action: "onClose" },
    onCancel: { action: "onCancel" },
    onSubmit: { action: "onSubmit" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ServiceFormComponent {...args} />;

export const NewService = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NewService.args = {
  open: true,
  title: "New Service",
};

export const EditService = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditService.args = {
  open: true,
  title: "Edit Service",
  initialValues: {
    title: "Photo Editing",
    details:
      "I have 5 years of experience in photo editing utilizing wide arsenal of photo editing software.",
    tags: ["photoEditing", "PhotoShop"],
    currency: "PHP",
    price: 67.32,
  },
};
