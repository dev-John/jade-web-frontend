import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Container,
  Grid,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { ROUTES } from '../constants';

const columns = [
  {
    id: 'type',
    label: 'Tipo',
    minWidth: 100,
    // format: (value) => (value === 0 ? 'Física' : 'Jurídica'),
  },
  {
    id: 'name',
    label: 'Nome/Razão Social',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'cpfCnpj',
    label: 'CPF/CNPJ',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'phone',
    label: 'Telefone',
    minWidth: 170,
    align: 'right',
    // format: (value) => new Date(value).toLocaleDateString('pt-br'),
  },
  {
    id: 'city',
    label: 'Cidade',
    minWidth: 170,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function PeopleManagement({
  people,
  getPeople,
  deletePerson,
  setPersonForm,
  setEditingPerson,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useHistory();

  useEffect(() => {
    getPeople();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editPerson = (person) => {
    setEditingPerson(true);
    setPersonForm({ ...person });
    history.push(ROUTES.PERSON_FORM);

    console.log('🚀 ~ file: PeopleManagement.js ~ line 83 ~ editPerson ~ person', person);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {people.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton onClick={() => deletePerson(row._id)}>
                        <CancelIcon />
                      </IconButton>

                      <IconButton>
                        <EditIcon onClick={() => editPerson(row)} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={people.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container justify="center">
        <a href={ROUTES.PERSON_FORM}>
          <small> Voltar a Tela de Lista de Pessoas</small>
        </a>
      </Grid>
    </Container>
  );
}
