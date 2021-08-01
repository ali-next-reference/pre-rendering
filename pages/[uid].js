function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// get serveside props is for sererside pre rendering for each request.
// it's good to use for personalised data that changes often
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}
