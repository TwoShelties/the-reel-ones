import React from "react";
import troText2 from "./media/troText2.png";
import { useNavigate } from "react-router-dom";

const Docs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        src={troText2}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
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
          <span className="code-line">
            <span className="code-ex-string">{`"success"`}</span>
            {`: `}
            <span className="code-ex-string">{`false`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"error"`}</span>
            {`: {`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-string">{`"type"`}</span>
            {`: `}
            <span className="code-ex-string">{`"InvalidToken"`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-string">{`"message"`}</span>
            {`: `}
            <span className="code-ex-string">{`"Invalid token, please register or log in"`}</span>
          </span>
          <br />
          <span className="code-line">{`},`}</span>
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"data"`}</span>
            {`: `}
            <span className="code-ex-string">{`null`}</span>
          </span>
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
      {/* POSTUSERS/REGISTER */}
      <p className="endpoint-ex">
        <code>POST /users/register</code>
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
      <div className="sample-code">
        <code>
          {`fetch(`}
          <span className="code-ex-string">{`"https://the-reel-ones.example.com/api/users/register"`}</span>
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
              "Content-Type": "application/json"
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
            <br />
            <span className="code-line-2">
              <span className="code-ex-header">{`username`}</span>
              {`: `}
              <span className="code-ex-string">{`"JohnDoe200"`}</span>

              {`,`}
            </span>
            <br />
            <span className="code-line-2">
              <span className="code-ex-header">{`password`}</span>
              {`: `}
              <span className="code-ex-string">{`"password123"`}</span>
            </span>
            <br />
            <span className="code-line">{`
            }),`}</span>
          </span>
          <br />
          {`}).then(response => response.json())`}
          <br />
          <span className="code-line">{`.then(result => {`}</span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-red">{`console`}</span>
            {`.log(result);`}
          </span>
          <br />
          <span className="code-line">{`})`}</span>
          <br />
          <span className="code-line">
            {`.catch(`}
            <span className="code-ex-red">{`console`}</span>
            {`.error);`}
          </span>
        </code>
      </div>
      <h3>Sample Response</h3>
      <div className="sample-code">
        <code>
          {`{`}
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"success"`}</span>:{" "}
            <span className="code-ex-string">{`true`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"error"`}</span>:{" "}
            <span className="code-ex-string">{`null`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"data"`}</span>
            {`: {`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-string">{`"token`}</span>
            {`: `}
            <span className="code-ex-string">{`"xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p"`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-string">{`"message`}</span>
            {`: `}
            <span className="code-ex-string">{`"Thanks for registering for the-reel-ones."`}</span>
          </span>
          <br />
          <span className="code-line">{`}`}</span>
          <br />
          {`}`}
        </code>
      </div>

      {/* POST USERS/LOGIN **/}
      <p className="endpoint-ex">
        <code>POST /users/login</code>
      </p>
      <p>
        This route is for existing users to login with their account
        information. On success, you will be given a JSON Web Token to be passed
        to the server for requests requiring authentication.
      </p>
      <h3>Request Parameters</h3>
      <ul className="api-docs-list">
        <li>
          <span className="bold">user</span> (
          <span className="bold">object</span>, required)
          <li className="circle-li">
            <span className="bold">username</span> (
            <span className="bold">string</span>, required): the user's username
          </li>
          <li className="circle-li">
            <span className="bold">password</span> (
            <span className="bold">string</span>, required): the user's password
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
      <div className="sample-code">
        <code>
          {`fetch(`}
          <span className="code-ex-string">{`"https://the-reel-ones.example.com/api/users/login"`}</span>
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
              "Content-Type": "application/json"
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
            <br />
            <span className="code-line-2">
              <span className="code-ex-header">{`username`}</span>
              {`: `}
              <span className="code-ex-string">{`"JohnDoe200"`}</span>
              {`,`}
            </span>
            <br />
            <span className="code-line-2">
              <span className="code-ex-header">{`password`}</span>
              {`: `}
              <span className="code-ex-string">{`"password123"`}</span>
            </span>
            <br />
            <span className="code-line">{`
            }),`}</span>
          </span>
          <br />
          {`}).then(response => response.json())`}
          <br />
          <span className="code-line">{`.then(result => {`}</span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-red">{`console`}</span>
            {`.log(result);`}
          </span>
          <br />
          <span className="code-line">{`})`}</span>
          <br />
          <span className="code-line">
            {`.catch(`}
            <span className="code-ex-red">{`console`}</span>
            {`.error);`}
          </span>
        </code>
      </div>

      <h3>Sample Response</h3>
      <div className="sample-code">
        <code>
          {`{`}
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"success"`}</span>:{" "}
            <span className="code-ex-string">{`true`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"error"`}</span>:{" "}
            <span className="code-ex-string">{`null`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"data"`}</span>
            {`: {`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-string">{`"token"`}</span>
            {`: `}
            <span className="code-ex-string">{`"xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p"`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-string">{`"message"`}</span>
            {`: `}
            <span className="code-ex-string">{`"You are logged into the-reel-ones."`}</span>
          </span>
          <br />
          <span className="code-line">{`}`}</span>
          <br />
          {`}`}
        </code>
      </div>

      {/* GET USERS/ME **/}
      <p className="endpoint-ex">
        <code>GET /users/me</code>
      </p>
      <p>
        This route returns certain relevant information to the end user about
        their account.
      </p>
      <p>
        Note: The user must be <span className="bold">logged in</span> to make
        this call.
      </p>
      <h3>Request Parameters</h3>
      <ul className="api-docs-list">
        <li>There are no required request parameters</li>
      </ul>
      <h3>Return Parameters</h3>
      <ul className="api-docs-list">
        <li>
          <span className="bold">user (object)</span>
          <ul>
            <li className="circle">id: the user's identification number</li>
            <li className="circle">username: the user's username</li>
          </ul>
        </li>
      </ul>
      <h3>Sample Call</h3>
      <div className="sample-code">
        <code>
          {`fetch(`}
          <span className="code-ex-string">{`"https://the-reel-ones.example.com/api/users/login"`}</span>
          {`, {`}
          <br />
          <span className="code-line">
            <span className="code-ex-header">{`
            method`}</span>
            {`: "GET",`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-header">{`
            headers`}</span>
            {`: {
              "Content-Type": "application/json"
            },`}
          </span>
          <br />
          {`}).then(response => response.json())`}
          <br />
          <span className="code-line">{`.then(result => {`}</span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-red">{`console`}</span>
            {`.log(result);`}
          </span>
          <br />
          <span className="code-line">{`})`}</span>
          <br />
          <span className="code-line">
            {`.catch(`}
            <span className="code-ex-red">{`console`}</span>
            {`.error);`}
          </span>
        </code>
      </div>

      <h3>Sample Response</h3>
      <div className="sample-code">
        <code>
          {`{`}
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"success"`}</span>:{" "}
            <span className="code-ex-string">{`true`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"error"`}</span>:{" "}
            <span className="code-ex-string">{`null`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line">
            <span className="code-ex-string">{`"data"`}</span>
            {`: {`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-string">{`"id"`}</span>
            {`: `}
            <span className="code-ex-string">{`123`}</span>
            {`,`}
          </span>
          <br />
          <span className="code-line-2">
            <span className="code-ex-string">{`"username"`}</span>
            {`: `}
            <span className="code-ex-string">{`"JohnDoe123"`}</span>
          </span>
          <br />
          <span className="code-line">{`}`}</span>
          <br />
          {`}`}
        </code>
      </div>

      {/*DELETE USERS/:userId **/}
      <p className="endpoint-ex">
        <code>DELTE /users/:userId</code>
      </p>
      <p>
        This route <span className="bold">deletes</span> the user specified in
        the endpoint params. For example, a DELETE request to /users/1 would
        delete the user with the ID of 1.
      </p>
      <p>
        Note: The user specified in this call will be{" "}
        <span className="bold">permanently</span> deleted.
      </p>
      <h3>Request Parameters</h3>
      <ul className="api-docs-list">
        <li>
          The user ID number for deletion, formatted in the call like this:
          /user/:userId
        </li>
      </ul>
      <h3>Return Parameters</h3>
      <ul className="api-docs-list">
        <li>
          <span className="bold">user (object)</span>
          <ul>
            <li className="circle">id: the user's identification number</li>
            <li className="circle">username: the user's username</li>
          </ul>
        </li>
      </ul>
      <h3>Sample Call</h3>
      {/* END OF APP DIV */}
    </div>
  );
};

export default Docs;
