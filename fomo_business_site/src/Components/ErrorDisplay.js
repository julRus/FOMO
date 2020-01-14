import React from "react";

export default function ErrorDisplay({ error }) {
  const { status, msg } = error;

  return (
    <>
      <p>{status}</p>
      <p>{msg}</p>
    </>
  );
}
