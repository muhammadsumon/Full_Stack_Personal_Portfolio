import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { getTechnologyList } from '../../../redux/slices/technology';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import TechnologyNewForm from '../../../components/_dashboard/technologies/TechnologyNewForm';

// ----------------------------------------------------------------------

export default function TechnologyCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { technologyList } = useSelector((state) => state.technology);
  const isEdit = pathname.includes('edit');
  const currentTechnology = technologyList.find((technology) => technology._id === id);

  useEffect(() => {
    dispatch(getTechnologyList());
  }, [dispatch]);

  return (
    <Page title="Technology: Create a new technology | Ms Portfolio">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new technology' : 'Edit technology'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Technology', href: PATH_DASHBOARD.technology.root },
            { name: !isEdit ? 'New technology' : id }
          ]}
        />

        <TechnologyNewForm isEdit={isEdit} currentTechnology={currentTechnology} />
      </Container>
    </Page>
  );
}
