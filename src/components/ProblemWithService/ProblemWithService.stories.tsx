import React, { useEffect } from "react";
import "./ProblemWithService.scss";
import { StoryFn, Meta } from "@storybook/react";
import ProblemWithService from "./ProblemWithService";
import { MemoryRouter, Routes } from "react-router";
import { Route } from "react-router-dom";
import { ConfigureOverallErrorSummary } from "../ErrorSummary";

let configured = false;

export default {
  title: "ReactComponentLibrary/Problem with service",
  component: ProblemWithService,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureProblemService = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeErrorSummaryConfigurations
          ) {
            ConfigureOverallErrorSummary();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallErrorSummary();
          }
        };
        configureProblemService();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"], // Enable automatic documentation generation
} as Meta<typeof ProblemWithService>;

const Template: StoryFn<typeof ProblemWithService> = (args) => (
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<ProblemWithService {...args} />} />
    </Routes>
  </MemoryRouter>
);

// Story for ProblemWithService with a custom message
export const WithCustomMessage = {
  render: Template,
  args: {
    message: "This is a test Problem with service message",
  },
};

// Story with a service name added
export const WithServiceName = {
  render: Template,
  args: {
    ...WithCustomMessage.args,
    applicationName: "React Component Library",
  },
};

// Story with a service name and a specific application route
export const WithCustomRoute = {
  render: Template,
  args: {
    ...WithServiceName.args,
    applicationRoute: "/specific-path",
  },
};

// Story with a reporting link and custom configurations
export const WithErrorReporting = {
  render: Template,
  args: {
    ...WithCustomRoute.args,
    reportingLink: "http://error-reporting-url",
  },
  parameters: { initializeErrorSummaryConfigurations: true }, // Ensuring configurations are initialized
};
