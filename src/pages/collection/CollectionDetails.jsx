import React from 'react'
import { useParams } from 'react-router-dom';
import ProductList from '../../components/product/ProductList';

export default function CollectionDetails() {

  const { name } = useParams();

  return (
    <ProductList collectionName={name} />
  )
}
