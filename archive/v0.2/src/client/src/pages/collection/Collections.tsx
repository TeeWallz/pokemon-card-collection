import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Collection } from "./Collection.type";
import { useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core/";
import Search from "../Search";
import PaginationApp from "../PaginationApp";
// import DeleteCollection from "./DeleteCollection";
// import { PostsContext } from "../../Context";
// import { CollectionsContext } from "../../Context";

export const QUERY = gql`
  query CollectionsPagination($page: Float!, $where: CollectionWhereInput) {
    collectionsPagination(page: $page, where: $where) {
      collections {
        id
        name
      }
      count
      take
    }
  }
`;

const Collections = () => {
  const queryString = require("query-string");
  // const context = React.useContext(CollectionsContext);
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const page = parsed.page ? Number(parsed.page) : 1;

  const { data } = useQuery(QUERY, {
    variables: {
      where: {
        search: parsed.search,
      },
      page,
    },
  });

  return (
    <>
      <h3>Collections</h3>
      <Search />
      <div style={{ height: "15px" }} />
      {data?.collectionsPagination?.collections && (
        <>
          {data.collectionsPagination.collections.map((collection: Collection) => (
            <Grid container key={collection.id} spacing={2}>
              <Grid item xs={12} sm={2}>
                &gt;{collection.id}
                {/*{context.collection.id !== collection.id && <DeleteCollection collectionId={collection.id} />}*/}
              </Grid>
              <Grid item xs={12} sm={6}>
                {collection.name}
              </Grid>
              {/*<Grid item xs={12} sm={5}>*/}
              {/*  /!*Last Login:{" "}*!/*/}
              {/*  /!*{collection.lastLogin &&*!/*/}
              {/*  /!*  new Date(collection.lastLogin).toLocaleDateString("en-US")}*!/*/}
              {/*  /!*<div>Role: {collection.role}</div>*!/*/}
              {/*</Grid>*/}
            </Grid>
          ))}
          <div style={{ height: "20px" }} />

          <PaginationApp
            count={data.collectionsPagination.count}
            take={data.collectionsPagination.take}
          />
        </>
      )}
    </>
  );
};
export default Collections;
