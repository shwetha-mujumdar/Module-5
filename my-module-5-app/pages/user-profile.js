// import React from 'react'

function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}
export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  //Incoming Messages and getting the response (builtin properties,functions)
  //   console.log(req);
  //   console.log(res);

  //Re-generating pages

  //   console.log("Server Side Code");

  return {
    props: {
      username: "Shwetha",
    },
  };
}
