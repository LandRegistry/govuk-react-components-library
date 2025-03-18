import React, {
  useEffect,
  useRef,
  FC,
  createRef,
  forwardRef,
  useMemo,
} from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { InfoSectionProps, WithRefProps } from "./WithReference.types";

// Component to handle refs for a single element
const WithRef: FC<WithRefProps> = ({ Component, ...restProps }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      console.log("DOM Ref: ", ref.current);
    }
  }, []);

  // Wrap Component with forwardRef to handle ref forwarding
  const ForwardedComponent = forwardRef<HTMLElement, unknown>((props, ref) => {
    return <Component {...props} ref={ref} />;
  });

  // Set a display name for better debugging
  ForwardedComponent.displayName = `Forwarded(${Component.displayName || Component.name || "Component"})`;

  return (
    <>
      <ForwardedComponent {...restProps} ref={ref} />
      <InfoSection refName="ref" Component={Component} restProps={restProps} />
    </>
  );
};

// Component to handle refs for multiple elements
const WithItemRefs: FC<WithRefProps> = ({ Component, ...restProps }) => {
  // Memoize refs to prevent unnecessary recreation
  const refs: React.RefObject<HTMLElement>[] = useMemo(
    () => restProps?.items?.map(() => createRef<HTMLElement>()),
    [restProps.items],
  );

  useEffect(() => {
    refs.forEach((ref, index) => {
      if (ref.current) {
        console.log(`DOM Ref for item ${index + 1}: `, ref.current);
      }
    });
  }, [refs]);

  const modifiedProps = {
    ...restProps,
    items: restProps?.items?.map((item: unknown, index: number) => ({
      ...item,
      ref: refs[index], // Attach the corresponding ref
    })),
  };

  return (
    <>
      <Component {...modifiedProps} />
      <p className="govuk-body">
        Each individual item now has a <code>ref</code> which references the DOM
        element. Check devtools for details.
      </p>
    </>
  );
};

// Reusable section to display ref usage instructions
const InfoSection: FC<InfoSectionProps> = ({
  refName,
  Component,
  restProps,
}) => {
  const jsxString = reactElementToJSXString(
    <Component {...restProps} refName="exampleRef" />,
  ).replace('refName="exampleRef"', `ref={${refName}}`);

  return (
    <>
      <p className="govuk-body">
        To access the DOM element, assign a <code>{refName}</code> prop. Check{" "}
        <a href="https://react.dev/reference/react/forwardRef">React Docs</a>{" "}
        for more details.
      </p>
      <code>
        <pre>
          {`const ${refName} = useRef();`}
          <br />
          {jsxString}
        </pre>
      </code>
      <p className="govuk-body">
        The ref will contain the DOM element. In simple cases like the{" "}
        <code>Button</code> component, the top-level element will be referenced.
        More complex components may have different behavior.
      </p>
    </>
  );
};

export { WithRef, WithItemRefs };
