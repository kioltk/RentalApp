import React from "react";
import { ReactNode } from "react";

type ProviderComponent = React.JSXElementConstructor<any>;
type ProviderTuple = [ProviderComponent, Record<string, any>];

interface ComposeProvidersProps {
  providers: ProviderTuple[];
  children: ReactNode;
}

// Implementation of the composeProviders function
export const Compose = ({ providers, children }: ComposeProvidersProps) => {
  return (
    <>
      {providers.reduceRight(
        (acc: ReactNode, [Provider, props]: ProviderTuple) => {
          return React.createElement(Provider, props, acc);
        },
        children
      )}
    </>
  );
};
