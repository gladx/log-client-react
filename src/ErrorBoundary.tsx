import React from 'react';

import { Button, Center, Flex } from '@chakra-ui/react';

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (!this.state.hasError) {
      return (
        <Center bg="tomato" color="white" padding={20}>
          <Flex flexDirection="column">
            <h4>Something went wrong.</h4>
            <br />
            <Button
              onClick={() => {
                this.setState({ hasError: false });
              }}
            >
              Reset
            </Button>
          </Flex>
        </Center>
      );
    }

    return this.props.children;
  }
}
