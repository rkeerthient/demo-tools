/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import Banner from "../components/banner";
import PageLayout from "../components/page-layout";
import ReviewsComponent from "../components/ReviewsComponent";
import SlideFromCenterToLeft from "../components/SlideFromCenterToLeft";
/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "reviewSubmission",
};

export const getPath: GetPath<TemplateProps> = () => {
  return `reviewSubmission.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Outreach | Home",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `transformProps`.
 */
const ReviewsSubmission: Template<TemplateRenderProps> = ({ document }) => {
  return (
    <>
      <PageLayout>
        <div>
          <div className="section space-y-14 px-10">
            <ReviewsComponent />
            {/* <SlideFromCenterToLeft /> */}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default ReviewsSubmission;
