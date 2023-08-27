import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useUserContext } from "src/contexts/UserContext";
import { build_request_url } from "src/lib/request";

const FeedPage = () => {
  const user = useUserContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const fetchMembers = async () => {
    const requestUrl = build_request_url("https://api.congress.gov")
      .extend("v3")
      .extend("member")
      .query_param("api_key", process.env.CONGRESS_API_KEY)
      .query_param("format", "json")
      .done();
    console.log({ requestUrl });
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log({ response });
    const json = await response.json();
    console.log(json);
    // process.env.CONGRESS_API_KEY
  };

  return (
    <>
      <MetaTags title="Feed" description="Feed page" />
      <button onClick={fetchMembers}>Fetch Members</button>
    </>
  );
};

export default FeedPage;
