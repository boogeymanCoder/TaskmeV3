import { RemoveRedEye } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { default as ReceiptFieldComponent } from "/src/components/receipt/ReceiptField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Receipt/Receipt Field",
  component: ReceiptFieldComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ReceiptFieldComponent {...args} />;

export const ReceiptField = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ReceiptField.args = {
  avatar:
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  title: "Brother John",
  subtitle: "Employer",
  action: (
    <IconButton onClick={() => alert("Action clicked!")}>
      <RemoveRedEye />
    </IconButton>
  ),
};
