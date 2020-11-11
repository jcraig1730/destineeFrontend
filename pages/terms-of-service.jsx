import React from "react";
import tosHTML from "../components/tos.html";
import dompurify from "isomorphic-dompurify";

var safeTOS = dompurify.sanitize(tosHTML);

const TermsOfService = () => {
  return <div dangerouslySetInnerHTML={{ __html: safeTOS }} />;
};

export default TermsOfService;
