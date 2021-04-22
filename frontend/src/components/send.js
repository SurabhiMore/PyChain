import React, { Component } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

const postEndpoint = '/add_transaction'
const getEndpoint = '/get_chain'
class Send extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipient: '',
      amount: 0,
      time: '',
      sender: '',
    }
    this.handleRecipient = this.handleRecipient.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRecipient(event){
    this.setState({ recipient: event.target.value});
  }
  handleAmount(event){
    this.setState({ amount: event.target.value});
  }
  componentDidMount() {
    axios.get(getEndpoint)
      .then(res => {
        const sender = res.data.chain[1].transactions[0].receiver;
        this.setState({ sender });
      })
    }

  handleSubmit(event) {
    event.preventDefault();

      axios.post(postEndpoint, { "sender": this.state.sender,
      "receiver": this.state.recipient,
      "amount": this.state.amount,
      "time": this.state.time })
       .then(res => {
         console.log(res);
         console.log(res.data);
       })
  }

  render(){
    return (
        <Container>
  <br/>
  <h3><b style={{color: '#311432'}}>Property Blocks</b></h3>
  <h4><b style={{color: '#A32CC4'}}>Land registry made simple!</b> </h4>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row}>
         <Form.Label column sm="2">
           Recipient
         </Form.Label>
         <Col sm="8">
           <Form.Control onChange={this.handleRecipient} value={this.state.recipient} placeholder="Enter Recipient Address" />
         </Col>
       </Form.Group>
       <Form.Group as={Row}>
        <Form.Label column sm="2">
          Property location
        </Form.Label>
        <Col sm="2">
          <Form.Control onChange={this.handleAmount} placeholder="Property location" value={this.state.amount} />
        </Col>
        <Col sm="0.5"><b> Address </b></Col>
      </Form.Group>
      <Form.Group as={Row}>
      <Col sm="5">
      <Button style={{backgroundColor: '#281E58'}} variant="primary" type="submit">
    Store
  </Button>
  </Col>
  </Form.Group>
     </Form>
     <br/><br/>
      </Container>
    );
  }
}

export default Send;
