import React from 'react'
import { Pagination } from 'react-bootstrap';

function MyPagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <Pagination>
        <Pagination.First />
        <Pagination.Prev />

        {pageNumbers.map(i => (
            <Pagination.Item key={i} onClick={paginate(i)}>
            {i}
            </Pagination.Item>
        ))}

        <Pagination.Next />
        <Pagination.Last />
    </Pagination>
  )
}

export default MyPagination