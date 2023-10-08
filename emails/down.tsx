import * as React from "react";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Row } from "@react-email/row";
import { Column } from "@react-email/column";

export function Email({
  userFirstName,
  checkDetails,
}: {
  userFirstName: string;
  checkDetails: {
    name: string;
    checkTime: Date;
    responseCode: number;
    responseText: string;
  };
}) {
  return (
    <Html lang="en">
      <Heading>CHECK DOWN!</Heading>
      <Text>Hello {userFirstName},</Text>
      <Text>Your check {checkDetails.name} is currently down. </Text>
      { /* Status code */ }
      <Row>
        <Column>{checkDetails.responseCode}</Column>
      </Row>
      { /* Status text */ }
      <Row>
        <Column>{checkDetails.responseText}</Column>
      </Row>
      { /* Last checked */ }
      <Row>
        <Column>{checkDetails.checkTime.toTimeString()}</Column>
      </Row>
    </Html>
  );
}
