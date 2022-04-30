import { RemoveRedEyeRounded } from "@mui/icons-material";
import React from "react";
import { default as ConfirmedReceiptComponent } from "/src/components/receipt/ConfirmedReceipt";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Receipt/Confirmed Receipt",
  component: ConfirmedReceiptComponent,
  argTypes: {
    onSubmit: { action: "onSubmit" },
    onViewEmployer: { action: "onViewEmployer" },
    onViewTask: { action: "onViewTask" },
    onViewEmployee: { action: "onViewEmployee" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ConfirmedReceiptComponent {...args} />;

export const ConfirmedReceipt = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ConfirmedReceipt.args = {
  employer: {
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    fullname: "Brother John",
  },
  task: {
    title: "Walk my dog",
    price: 100,
    currency: "USD",
  },
  employee: {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    fullname: "Melisa Mayers",
  },
  receivedPayment: 23.54,
  images: [
    "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1583521214690-73421a1829a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/flagged/photo-1558963675-94dc9c4a66a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  ],
};
