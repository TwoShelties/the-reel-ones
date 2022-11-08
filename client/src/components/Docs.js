import React from "react";

const Docs = () => {
  return (
    <div>
      <h1>API Documentation</h1>
      <h2>Introduction</h2>
      <p>
        Despite being a full stack application, The Real Ones offers an API with
        various endpoints, for various use cases for designing front end
        applications.
      </p>
      <h2>API URL Format</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <ul className="api-docs-list">
        <li>
          The base URL is{" "}
          <span className="bold">https://the-reel-ones.example.com</span>
        </li>
        <li>
          The first segment of every path is <span className="bold">/api</span>
        </li>
        <li>
          The next segment will be the endpoint, e.g.{" "}
          <span className="bold">/films</span>
        </li>
        <li>
          So, an example URL would look like{" "}
          <span className="bold">
            https://the-reel-ones.example.com/api/films
          </span>
        </li>
      </ul>
      <h2>Authentication Through JSON Web Tokens</h2>
      <p>
        When using the API, many calls are made in the context of a{" "}
        <span className="bold">registered user</span>. The API protects itself
        by requiring a token string passed in the Header for requests made in
        that context.
      </p>
      <p>
        Additionally, some calls are made in the context of an{" "}
        <span className="bold">admin user</span>. For these calls the API
        requires a token string passed in the Header for requests made in that
        context.
      </p>
      <p>
        A sample request <span className="bold">with</span> an{" "}
        <span className="bold">authorization</span> or{" "}
        <span className="bold">admin</span> token looks like this:
      </p>
      <div className="sample-code">
        <code>
          {`fetch(`}
          <span className="code-ex-string">{`"https://the-reel-ones.example.com/api/films/rent"`}</span>
          {`, {`}
          <br />
          <span className="code-line">
            <span className="code-ex-header">{`
            method`}</span>
            {`: "POST",`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-header">{`
            headers`}</span>
            {`: {
              "Content-Type": "application/json",
              Authorization: "Bearer TOKEN_STRING_HERE",
            },`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-header">
              {`
            body`}
            </span>
            {`: `}
            <span className="code-ex-red">{`JSON`}</span>
            {`.stringify({`}
            <span className="code-ex-comment">{`
              /* request body to API */`}</span>
            {`
            }),`}
          </span>
          <br />
          <span className="code-line">
            {`
          })`}
          </span>
        </code>
      </div>
      <p>
        The value for <span className="bold">Authorization</span> must be a
        string starting with 'Bearer', followed by a space and then the token
        you received by either registering or logging in. Requests without this
        format will prevent the API from recognizing the token. If the string is
        not formatted properly, or the token is malformed, revoked, or
        unrecognized you will receive an error response like this:
      </p>
      <div className="sample-code">
        <code>
          {`{`}
          <br />
          <span className="code-line">{`"success": false,`}</span>
          <br />
          <span className="code-line">{`"error": {`}</span>
          <br />
          <span className="code-line-2">{`"type": "InvalidToken",`}</span>
          <br />
          <span className="code-line-2">{`"message": "Invalid token, please register or log in"`}</span>
          <br />
          <span className="code-line">{`},`}</span>
          <br />
          <span className="code-line">{`"data": null`}</span>
          <br />
          {`}`}
        </code>
      </div>
      <h2>Return Schema</h2>
      <p>
        In general, you will receive a return schema with either{" "}
        <span className="bold">success: true</span> or{" "}
        <span className="bold">success: false</span>. The return schema should
        look similar to this:
      </p>
      <div className="sample-code">
        <code>
          {`{`}
          <br />
          <span className="code-line">
            <span className="code-ex-header">{`success`}</span>
            {`: `}
            <span className="code-ex-string">{`false`}</span>
            {`, `}
            <span className="code-ex-comment">{` // or true `}</span>
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-header">{`error`}</span>
            {`: {`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-header">{`name`}</span>
            {`: `}
            <span className="code-ex-string">{`"SampleError"`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-header">{`message`}</span>
            {`: `}
            <span className="code-ex-string">{`"This is a sample error message"`}</span>
          </span>
          <br />
          <span className="code-line">
            {`}, `}
            <span className="code-ex-comment">{` // or null`}</span>
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-header">{`data`}</span>
            {`: {`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-header">{`user: `}</span>
            {`{ `}
            <span className="code-ex-header">{`username`}</span>:{" "}
            <span className="code-ex-string">"JohnDoe"</span>
            {` },`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-header">message</span>:{" "}
            <span className="code-ex-string">
              "this is a sample call response message"
            </span>
            <br />
            <span className="code-line">{`}`}</span>
            <span className="code-ex-comment"> // or null</span>
          </span>
          <br />
          {`}`}
        </code>
      </div>
      <h2>User Endpoints</h2>
      <p className="endpoint-ex">
        <code>POST /api/users/register</code>
      </p>
      <p>
        This route is used to create a new user account. On success you will be
        given a JSON Web Token to be passed to the server for requests requiring
        authentication.
      </p>
      <h3>Request Parameters</h3>
      <ul className="api-docs-list">
        <li>
          <span className="bold">user</span> (
          <span className="bold">object</span>, required)
          <li className="circle-li">
            <span className="bold">username</span> (
            <span className="bold">string</span>, required): the desired
            username for the new user
          </li>
          <li className="circle-li">
            <span className="bold">password</span> (
            <span className="bold">string</span>, required): the desired
            password for the new user
          </li>
        </li>
      </ul>
      <h3>Return Parameters</h3>
      <ul className="api-docs-list">
        <li>
          <span className="bold">token</span> (
          <span className="bold">string</span>): the JSON Web Token which is
          used to authenticate the user with any future calls
        </li>
      </ul>
      <h3>Sample Call</h3>
    </div>
  );
};

export default Docs;
