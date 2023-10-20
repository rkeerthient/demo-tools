import * as React from "react";
interface ResponseProps {
  respText: string[];
  status?: "error" | "success";
}

const ResponseCard = ({ respText, status }: ResponseProps) => {
  return (
    <div>
      {respText &&
        respText.map((item, key) => (
          <p key={key} className={`${status === "error" && `text-red-500`}`}>
            {item}
          </p>
        ))}{" "}
    </div>
  );
};

export default ResponseCard;
