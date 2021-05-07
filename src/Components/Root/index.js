import React, { useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import {
  Column,
  Container,
  Post,
  PostAuthor,
  PostBody,
  StyledPaginateContainer,
} from './styles'

import ExpensiveTree from '../ExpensiveTree'

function Root() {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])
  const [value, setValue] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const postsPerPage = 10

  const { data, loading } = useQuery(postsQuery, {
    variables: { page: pageNumber, limit: postsPerPage },
  })
  const posts = data?.posts.data || []
  const totalPostsCount = data?.posts?.meta.totalCount || 0

  const pageCount = Math.floor(totalPostsCount / postsPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  const latestCount = useRef()
  latestCount.current = count

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${latestCount.current} times`)
    }, 2500)
  }

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : posts.map(post => (
              <Post key={post.id} mx={4}>
                <NavLink href={POST(post.id)} to={POST(post.id)}>
                  {post.title}
                </NavLink>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
        <StyledPaginateContainer>
          <ReactPaginate
            activeClassName="paginationActive"
            containerClassName="paginationButtons"
            disabledClassName="paginationDisabled"
            marginPagesDisplayed={1}
            nextLabel="Next"
            nextLinkClassName="nextButton"
            pageCount={pageCount}
            pageRangeDisplayed={2}
            previousLabel="Previous"
            previousLinkClassName="previousButton"
            onPageChange={changePage}
          />
        </StyledPaginateContainer>
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br />
          <input
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </label>
        <p>So slow...</p>
        <ExpensiveTree />

        <h4>Closures</h4>
        <p>You clicked {count} times</p>
        <button type="button" onClick={() => setCount(prev => prev + 1)}>
          Click me
        </button>
        <button type="button" onClick={handleAlertClick}>
          Show alert
        </button>
      </Column>

      <Column>
        <h4>Incorrect form field behavior</h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields.map((field, index) => (
            <li key={field.id}>
              {field.name}:<br />
              <input type="text" />
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
