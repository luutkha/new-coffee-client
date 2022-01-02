import { Button, Table, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryActions } from 'features/category/categorySlice';
import { Category, FilterFormat, Product } from 'models';
import React, { useEffect } from 'react';
import { productActions } from '../productSlice';

interface Props {}

export const ProductPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const listProduct: Product[] = useAppSelector((state) => state.product.list);
  const listCategory: Category[] = useAppSelector(state => state.category.list)
  const listCategoryFormatted : FilterFormat[] = []
  listCategory.forEach((category, index) =>{
      let filerItem : FilterFormat = {text: category.name, value:category.name}
      listCategoryFormatted.push(filerItem)
  })
  useEffect(() => {
    dispatch(productActions.fetchProductList());
    dispatch(categoryActions.fetchCategoryList());

  }, []);
  const columns: any = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text}</strong>,
      width: '25%',
      
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Loại',
      dataIndex: ['category', 'name'],
      key: 'category',
      filters: listCategoryFormatted,
              filterMode: 'tree',
              filterSearch: true,
              onFilter: (value: string, record: Product) => record?.category.name.includes(value),
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      // width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (tag: boolean) => {
        if (tag === false) return <Tag color="red">{(tag + '').toUpperCase()}</Tag>;
        else return <Tag color="green">{(tag + '').toUpperCase()}</Tag>;
      },
      // width: '20%'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      // width: '20%'
    },
    {
      title: 'Chi tiết',
      key: 'lastOnline',
      render: (obj: Product) => {
        return (
          <div>
            {' '}
            <Button
              icon={<i className="fas fa-user-circle"></i>}
              type="primary"
              // onClick={() => showModal(obj)}
            >
              &nbsp;&nbsp;Chi tiết
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={listProduct}
        pagination={false}
        scroll={{ y: 750 }}
      />
    </div>
  );
};
