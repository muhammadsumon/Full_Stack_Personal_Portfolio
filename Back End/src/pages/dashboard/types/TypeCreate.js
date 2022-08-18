import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { getTypeList } from '../../../redux/slices/type';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import TypeNewForm from '../../../components/_dashboard/type/TypeNewForm';

// ----------------------------------------------------------------------

export default function TypeCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { typeList } = useSelector((state) => state.type);
  const isEdit = pathname.includes('edit');
  const currentType = typeList.find((type) => type._id === id);

  useEffect(() => {
    dispatch(getTypeList());
  }, [dispatch]);

  return (
    <Page title="Type: Create a new type | Ms Portfolio">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new type' : 'Edit type'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Type', href: PATH_DASHBOARD.type.root },
            { name: !isEdit ? 'New Type' : id }
          ]}
        />

        <TypeNewForm isEdit={isEdit} currentType={currentType} />
      </Container>
    </Page>
  );
}
