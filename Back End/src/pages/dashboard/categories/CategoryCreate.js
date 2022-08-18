import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { getCategoryList } from '../../../redux/slices/category';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import CategoryNewForm from '../../../components/_dashboard/categories/CategoryNewForm';

// ----------------------------------------------------------------------

export default function CategoryCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { categoryList } = useSelector((state) => state.category);
  const isEdit = pathname.includes('edit');
  const currentCategory = categoryList.find((category) => category._id === id);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Page title="Category: Create a new category | Ms Portfolio">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new category' : 'Edit category'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Category', href: PATH_DASHBOARD.category.root },
            { name: !isEdit ? 'New category' : id }
          ]}
        />

        <CategoryNewForm isEdit={isEdit} currentCategory={currentCategory} />
      </Container>
    </Page>
  );
}
