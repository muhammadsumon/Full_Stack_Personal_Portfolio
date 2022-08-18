import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { getProjectList } from '../../../redux/slices/project';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import ProjectEditForm from '../../../components/_dashboard/project/ProjectEditForm';

// ----------------------------------------------------------------------

export default function ProjectCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');
  const { id } = useParams();
  const { projectList } = useSelector((state) => state.project);
  const currentProject = projectList.find((project) => project._id === id);

  useEffect(() => {
    dispatch(getProjectList());
  }, [dispatch]);

  return (
    <Page title="Project: Create a new project | Ms Portfolio">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new project' : 'Edit project'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Project', href: PATH_DASHBOARD.project.root },
            { name: !isEdit ? 'New project' : id }
          ]}
        />

        <ProjectEditForm isEdit={isEdit} currentProject={currentProject} />
      </Container>
    </Page>
  );
}
