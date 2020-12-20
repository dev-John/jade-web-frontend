import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

import { ROUTES, CPF, CNPJ } from '../constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PhoneSearch({
  tableHead,
  getTableHead,
  getUfs,
  getCitiesByUf,
  ufs,
  cities,
  searchPerson,
  person,
}) {
  const classes = useStyles();
  const [selectedRadio, setSelectedRadio] = React.useState('a');
  const [docType, setDocType] = useState(CPF); // CPF or CNPJ
  const [cpfCnpj, setCpfCnpj] = useState();
  const [uf, setUf] = useState();
  const [city, setCity] = useState();
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    getUfs();
  }, []);

  useEffect(() => {
    uf && getCitiesByUf(uf);
  }, [uf]);

  const timeoutProtect = () => {
    setTimeout(() => setDisabledButton(false), 4000);
  };

  const sendRequest = (e) => {
    e.preventDefault();
    getTableHead();
    searchPerson({ cpfCnpj, uf, city });
    setDisabledButton(true);
    timeoutProtect();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Lista pública de telefone
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container justify="center">
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                  value={CPF}
                  control={
                    <Radio
                      checked={selectedRadio === 'a'}
                      onChange={(e) => {
                        setSelectedRadio(e.target.value);
                        setDocType(CPF);
                      }}
                      value="a"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                  }
                  label="Pessoa Física"
                  labelPlacement={CPF}
                />
                <FormControlLabel
                  value={CNPJ}
                  control={
                    <Radio
                      checked={selectedRadio === 'b'}
                      onChange={(e) => {
                        setSelectedRadio(e.target.value);
                        setDocType(CNPJ);
                      }}
                      value="b"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'B' }}
                    />
                  }
                  label="Pessoa Jurídica"
                  labelPlacement={CNPJ}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
              <TextField
                autoComplete="cpfCnpj"
                name="cpfCnpj"
                variant="outlined"
                required
                fullWidth
                id="cpfCnpj"
                label={docType === CPF ? 'CPF' : 'CNPJ'}
                onChange={(e) => setCpfCnpj(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">UF</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  id="uf"
                  label="UF"
                  name="uf"
                  autoComplete="uf"
                  onChange={(e) => setUf(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Selecione uma UF</em>
                  </MenuItem>
                  {ufs.map((uf) => (
                    <MenuItem key={uf.uf} value={uf.uf}>
                      {uf.uf}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Cidade</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="Cidade"
                  name="city"
                  autoComplete="city"
                  onChange={(e) => setCity(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Selecione uma Cidade</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabledButton}
            onClick={(e) => sendRequest(e)}
          >
            Buscar
          </Button>
          <Grid container justify="center">
            <a href={ROUTES.PEOPLE_MANAGEMENT}>
              <small>Gerenciar Pessoa</small>
            </a>
          </Grid>
        </form>
        {person[0] && person[0].cpfCnpj ? (
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
                {person.map((row) => {
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ''
        )}
      </div>
    </Container>
  );
}
