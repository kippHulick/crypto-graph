import React from 'react';
import Header from './Header';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Carousel from './Carousel';



const BaseLayout = (props) => {
  return (
    <>
      <Header />
      <Carousel />

      <Container fluid className='m-1 p-1'>
        <Row className='m-0 p-0'>
          <Col lg={true}>
            <div className='p-2'>{props.children}</div>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default BaseLayout
