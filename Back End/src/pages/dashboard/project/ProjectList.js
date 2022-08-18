import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
// redux
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../../config';
import { deleteProject, getProjectList } from '../../../redux/slices/project';
import { useDispatch } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import {
  ProjectListHead,
  ProjectListToolbar,
  ProjectMoreMenu
} from '../../../components/_dashboard/project/list/index';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: '', label: 'Action', alignRight: true }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_project) => _project.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ProjectList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { projectList } = useSelector((state) => state.project);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getProjectList());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = projectList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteProject = async (projectId) => {
    if (user.role === 'admin') {
      await axios
        .delete(`${apiUrl}/projects/${projectId}`, {
          withCredentials: true
        })
        .then((res) => {
          if (res.data.deletedDocument) {
            dispatch(deleteProject(projectId));
          }
        })
        .catch((err) => {
          if (err) {
            enqueueSnackbar('Something Went Wrong !', { variant: 'error' });
          }
        });
    } else if (user.role === 'guest') {
      enqueueSnackbar('Only Admin Can Perform This Action !', { variant: 'warning' });
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projectList.length) : 0;

  const filteredProjects = applySortFilter(projectList, getComparator(order, orderBy), filterName);

  const isProjectNotFound = filteredProjects.length === 0;

  return (
    <Page title="Project - List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Project List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Project', href: PATH_DASHBOARD.project.root },
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.project.newProject}
              startIcon={<Icon icon={plusFill} />}
            >
              New Project
            </Button>
          }
        />

        <Card>
          <ProjectListToolbar
            placeHolderText="Search Project..."
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProjectListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={projectList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, name, type, category } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{ textTransform: 'capitalize' }} variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell style={{ textTransform: 'capitalize' }} align="left">
                          {type ? type.name : '.'}
                        </TableCell>
                        <TableCell style={{ textTransform: 'capitalize' }} align="left">
                          {category ? category.name : '.'}
                        </TableCell>
                        <TableCell align="right">
                          <ProjectMoreMenu onDelete={() => handleDeleteProject(_id)} projectName={_id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProjectNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={projectList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
