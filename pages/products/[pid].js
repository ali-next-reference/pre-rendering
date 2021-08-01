import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  // id given from getStatic paths so that each product that exists can be pregenerated
  const productId = params.pid;
  
  // load the product data to get the info for a product with a matching id
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// getStaticPaths helps with static pre rendering
// it does it by 
export async function getStaticPaths() {
  
  // fetch all of the products
  const data = await getData();
  // get an array of ids
  const ids = data.products.map((product) => product.id);
  // format it to an a array of objects in a form next js needs
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    // paths with params is an object that creates a prop for getStaticPaths '{ params: { pid: id } }'
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
