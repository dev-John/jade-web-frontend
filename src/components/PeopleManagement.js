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
  Box,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { ROUTES } from '../constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function PeopleManagement({
  getTableHead,
  tableHead,
  people,
  getPeople,
  deletePerson,
  setPersonForm,
  setEditingPerson,
  changePage,
  changeRowsPerPage,
  page,
  rowsPerPage,
  totalRows,
  resetPerson,
}) {
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    resetPerson();
    getTableHead();
    getPeople();
  }, []);

  const handleChangePage = (event, newPage) => {
    changePage(newPage);
    getPeople();
  };

  const handleChangeRowsPerPage = (event) => {
    changeRowsPerPage(+event.target.value);
    changePage(0);
    getPeople();
  };

  const editPerson = (person) => {
    setEditingPerson(true);
    setPersonForm({ ...person });
    history.push(ROUTES.PERSON_FORM);

    console.log('🚀 ~ file: PeopleManagement.js ~ line 83 ~ editPerson ~ person', person);
  };

  return (
    <Container component="main" maxWidth="md">
      <br />

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableHead.map((column) => (
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
                    {tableHead.map((column) => {
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
          labelRowsPerPage="Registros por Página"
          nextIconButtonText="Próxima Página"
          backIconButtonText="Página Anterior"
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Box m={2}>
        <Grid container justify="space-between">
          <a href={ROUTES.PHONE_SEARCH}>
            <small> Voltar a Tela de Pesquisa de Telefone</small>
          </a>
          <a href={ROUTES.PERSON_FORM}>
            <small>Criar nova pessoa</small>
          </a>
        </Grid>
      </Box>

      <Grid container justify="flex-end"></Grid>
    </Container>
  );
}
