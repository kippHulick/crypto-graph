import React from 'react';
import Header from './Header';
import { Container, Row, Col, Card } from 'react-bootstrap';



const BaseLayout = (props) => {
  return (
    <>
      <Header />

      <Container fluid className='m-1 p-1'>
        <Row className='m-0 p-0'>
          <Col lg={true}>
            <Card className='shadow-lg'>
            <div className='p-2'>{props.children}</div>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default BaseLayout
