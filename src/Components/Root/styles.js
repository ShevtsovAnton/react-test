import styled from 'styled-components'
import { margin } from '@styled-system/space'

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  justify-content: space-between;
`

export const Column = styled.div`
  width: 40%;
  min-height: 100vh;
  padding: 16px;
`

export const Post = styled.div.attrs({
  mx: 0,
  my: 3,
})`
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 8px;
  background: lightgray;
  padding: 16px;

  ${margin}
`

export const PostAuthor = styled.small`
  display: block;
  color: gray;
`

export const PostBody = styled.div`
  height: 19px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`

export const StyledPaginateContainer = styled.div`
  .paginationButtons {
    width: 80%;
    height: 40px;
    list-style: none;
    display: flex;
    justify-content: center;
  }

  .paginationButtons a {
    padding: 10px;
    margin: 8px;
    border: 1px solid #2b2eff;
    color: #2b2eff;
    border-radius: 5px;
    cursor: pointer;
  }

  .paginationButtons a:hover {
    color: white;
    background-color: #2b2eff;
  }
  .paginationActive a {
    color: white;
    background-color: #2b2eff;
  }

  .paginationDisabled {
    color: gray;
  }
`
