import React from "react";
import Modal from "react-modal";
import "./modal_styles.css";
import { Button, Form, Col } from "react-bootstrap";
export default function SideModal(props) {
  return (
    <Modal closeTimeoutMS={500} isOpen={props.isOpen}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="danger" onClick={() => props.toggle()}>
          Close
        </Button>
      </div>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPNR">
            <Form.Label>PNR_NO</Form.Label>
            <Form.Control type="text" value={props.selectedRow.PNR_No} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={props.selectedRow["Name"]} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridPNR">
            <Form.Label>From</Form.Label>
            <Form.Control type="text" value={props.selectedRow["From"]} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>To</Form.Label>
            <Form.Control type="text" value={props.selectedRow["To"]} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="text" value={props.selectedRow["Contact_Number"]}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Date Of Journey</Form.Label>
            <Form.Control type="text" value={props.selectedRow["Date_of_journey"]}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type="text" value={props.selectedRow["Total_Amount"]}/>
          </Form.Group>
        </Form.Row>
      </Form>
    </Modal>
  );
}
