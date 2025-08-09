import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton
          key={i}
          height="45px"
          startColor="gray.700"
          endColor="gray.600"
          borderRadius="md"
        />
      ))}
    </Stack>
  );
};

export default ChatLoading;
