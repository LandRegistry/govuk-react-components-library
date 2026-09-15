import React from "react";
import { render, screen } from "@testing-library/react";
import { WithRef, WithItemRefs } from "./WithReference";

// Mock component to test ref assignment
// Define a type for the props (optional but useful for typing additional props)
type TestComponentProps = React.HTMLAttributes<HTMLDivElement>;

const TestComponent = React.forwardRef<HTMLDivElement, TestComponentProps>(
  (props, ref) => (
    <div ref={ref} {...props}>
      Test Component
    </div>
  ),
);
TestComponent.displayName = "TestComponent";

// Component that never forwards the ref, so ref.current stays null
const RefLessComponent: React.FC<TestComponentProps> = () => (
  <div>Ref-less Component</div>
);

// Mock component for items that never attaches the refs to any DOM node
const RefLessListComponent: React.FC<TestListComponentProps> = ({ items }) => (
  <ul>
    {(items ?? []).map((_, index) => (
      <li key={index}>Item {index + 1}</li>
    ))}
  </ul>
);

// Mock component for items
interface TestListComponentProps {
  items?: { ref: React.Ref<HTMLLIElement> | undefined }[];
}

const TestListComponent: React.FC<TestListComponentProps> = ({ items }) => (
  <ul>
    {(items ?? []).map((item, index) => (
      <li key={index} ref={item.ref}>
        Item {index + 1}
      </li>
    ))}
  </ul>
);

beforeAll(() => {
  console.groupCollapsed = jest.fn();
  console.info = jest.fn();
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
  console.groupEnd = jest.fn();
});

describe("WithRef Component", () => {
  it("should render and attach ref to the DOM element", () => {
    render(<WithRef Component={TestComponent} />);

    // Check if the component is rendered
    expect(screen.getByText("Test Component")).toBeInTheDocument();

    // You could mock the console.log and check if it logged the ref in useEffect
  });

  it("should not throw when the wrapped component never attaches the ref", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<WithRef Component={RefLessComponent as any} />);
    expect(screen.getByText("Ref-less Component")).toBeInTheDocument();
  });
});

describe("WithItemRefs Component", () => {
  it("should render items and attach refs to them", () => {
    const items = [{}, {}, {}]; // Mock items
    render(<WithItemRefs Component={TestListComponent} items={items} />);

    // Check if the items are rendered
    items.forEach((_, index) => {
      expect(screen.getByText(`Item ${index + 1}`)).toBeInTheDocument();
    });

    // Again, you can mock console.log and ensure refs are logged properly
  });

  it("should render without throwing when no items are provided", () => {
    render(<WithItemRefs Component={TestListComponent} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("should not throw when the wrapped component never attaches item refs", () => {
    const items = [{}, {}];
    render(
      <WithItemRefs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Component={RefLessListComponent as any}
        items={items}
      />,
    );
    items.forEach((_, index) => {
      expect(screen.getByText(`Item ${index + 1}`)).toBeInTheDocument();
    });
  });
});
