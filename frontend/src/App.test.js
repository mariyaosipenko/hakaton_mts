import { render, screen } from "@testing-library/react";
import App from "./App";

test("main header", () => {
    render(<App />);
    const linkElement = screen.getByText(/hachathon mtc/i);
    expect(linkElement).toBeInTheDocument();
});
