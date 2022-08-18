import { useEffect } from 'react';
// material
import { Container } from '@mui/material';
// redux
import { getProjectList } from '../../../redux/slices/project';
import { useDispatch } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import ProjectNewForm from '../../../components/_dashboard/project/ProjectNewForm';

// ----------------------------------------------------------------------

export default function ProjectCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectList());
  }, [dispatch]);

  return (
    <Page title="Project: Create a new project | Ms Portfolio">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new project"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Project', href: PATH_DASHBOARD.project.root },
            { name: 'New project' }
          ]}
        />

        <ProjectNewForm />
      </Container>
    </Page>
  );
}
