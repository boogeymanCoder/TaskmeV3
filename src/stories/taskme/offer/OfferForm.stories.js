import React from "react";
import { default as OfferFormComponent } from "/src/components/offer/OfferForm";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Offer/Offer Form",
  component: OfferFormComponent,
  argTypes: {
    onClose: { action: "onClose" },
    onClose: { action: "onClose" },
    onSubmit: { action: "onSubmit" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <OfferFormComponent {...args} />;

export const NewOffer = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NewOffer.args = {
  open: true,
  title: "New Offer",
};

export const EditForm = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditForm.args = {
  open: true,
  title: "Edit Offer",
  initialValues: {
    task: "/tasks/fd6ab7db-0531-4b22-8ffd-2a1097dfe28f",
    details:
      "I am currently looking for a photo editor for my sisters birthday, if you are interested.",
  },
};
