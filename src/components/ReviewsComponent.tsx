import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Root } from "../types/ContentResponse";
import ResponseCard from "./ResponseCard";

interface FormData {
  contentEndpoint: string;
  contentAPIKey: string;
}

const ReviewsComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLeft, setIsLeft] = useState(false);
  const [responseData, setResponseData] = useState<string[]>([]);
  const [status, setStatus] = useState<"error" | "success" | undefined>();
  const [formData, setFormData] = useState<FormData>({
    contentEndpoint: "",
    contentAPIKey: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const result: Root = await response.json();
      if (result.meta.errors.length) {
        setStatus("error");
        setResponseData((prevData) => [
          ...prevData,
          `Error occurred - ${result.meta.errors[0].message}`,
        ]);
      } else {
        setResponseData((prevData) => [...prevData, url]);
        if (result.response.nextPageToken) {
          const nextPageUrl = new URL(url);
          nextPageUrl.searchParams.set(
            "pageToken",
            result.response.nextPageToken
          );
          await fetchData(`${nextPageUrl.toString()}`);
          setStatus("success");
        }
      }
    } catch (error: any) {
      setStatus("error");
      setResponseData((prevData) => [...prevData, error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    setIsLeft(true);
    setIsLoading(true);
    setResponseData([]);
    setStatus(undefined);
    let buildUrl = `${formData.contentEndpoint}?api_key=${
      formData.contentAPIKey
    }&v=${new Date().toISOString().slice(0, 10).replaceAll("-", "")}&limit=50`;
    fetchData(buildUrl);
  };
  

  return (
    <div
      className={`w-full   flex gap-8 ${
        isLeft ? " transition-transform duration-500 ease-in-out" : ""
      }`}
    >
      <div className="mx-auto border max-w-md w-full h-fit">
        <div className={`relative mx-auto p-8`}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          )}
          <div className=" mx-auto bg-white ">
            <h2 className="text-2xl font-semibold mb-4">
              Review Generation Form
            </h2>
            <div className="mb-4">
              <label
                htmlFor="contentEndpoint"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Content Endpoint
              </label>
              <input
                autoComplete="off"
                type="text"
                id="contentEndpoint"
                name="contentEndpoint"
                value={formData.contentEndpoint}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contentAPIKey"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                API Key
              </label>
              <input
                autoComplete="off"
                type="text"
                id="contentAPIKey"
                name="contentAPIKey"
                value={formData.contentAPIKey}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex items-center">
              <button
                onClick={handleSubmit}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ${
                  formData.contentAPIKey && formData.contentEndpoint
                    ? `cursor-pointer`
                    : `pointer-events-none opacity-60`
                }`}
              >
                Generate Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLeft && (
        <div className="border p-4 w-2/3  overflow-scroll h-[80vh]">
          {responseData && (
            <ResponseCard
              respText={[...responseData]}
              status={status}
            ></ResponseCard>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsComponent;

// Content Endpoint list - https://api.yextapis.com/v2/accounts/me/config/resourcenames/streams/streams-endpoint?api_key=a4b02b315992d693663d4065ad9184bc&v=20230601
