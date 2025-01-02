import React from "react";
import { Card, Stack,  Text, Input, Button } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Field } from "@/components/ui/field";

const UpdateProfilePage = () => {
  return (
    <Stack align="center" spacing={6} py={12}>
      <Card.Root width="400px" borderWidth="1px" borderRadius="lg" p={4}>
        <Card.Title textAlign="center" fontSize={"2xl"} fontWeight={"bold"}>Update Profile</Card.Title>
        <Card.Body>
          {/* Avatar Section */}
          <Stack align="center"mb={3}>
            <Avatar
              height="100px"
              width="100px"
              src="https://bit.ly/sage-adebayo"
              name="User Icon"
            />
            <Button size="sm" variant="outline" colorScheme="blue">
              Change Avatar
            </Button>
          </Stack>

          {/* User Info Section */}
          <Stack spacing={4}>
            <Field label="Full Name" required>
              <Input placeholder="FullName" type="text" />
            </Field>
            <Field label="Username" required>
              <Input placeholder="UserName" type="text" />
            </Field>
            <Field label="Email" required>
              <Input placeholder="your-email@example.com" type="email" />
            </Field>
            <Field label="Bio">
              <Input placeholder="your bio " type="email" />
            </Field>
            <Field label = "Password" required>
              <Input placeholder="Enter your password" type="password" />
            </Field>
          </Stack>
        </Card.Body>

        {/* Action Buttons */}
        <Card.Footer mt={6} display="flex" justifyContent="space-between">
          <Button variant="outline" colorScheme="red">
            Cancel
          </Button>
          <Button variant="solid" colorScheme="blue">
            Submit
          </Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  );
};

export default UpdateProfilePage;
