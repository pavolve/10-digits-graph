import React from "react";
import { render, cleanup } from "@testing-library/react";
import { SeriesProvider } from "./../../../context/SeriesContext";
import VisChart from "./../VisChart";

afterEach(cleanup);

it("Chart snapshot", () => {
  const { asFragment } = render(
    <SeriesProvider>
      <VisChart />
    </SeriesProvider>
  );

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="rv-xy-plot "
        style="width: 1024px; height: 480px;"
      />
    </DocumentFragment>
  `);
});
