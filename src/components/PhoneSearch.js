import React, { useState } from 'react';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PhoneSearch({}) {
  const classes = useStyles();
  const [selectedRadio, setSelectedRadio] = React.useState('a');
  const [docType, setDocType] = useState(CPF); // CPF or CNPJ
  const [cpfCnpj, setCpfCnpj] = useState();
  const [uf, setUf] = useState();
  const [city, setCity] = useState();

  const sendRequest = (e) => {
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
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
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
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
                  {/* {ufs.map((uf) => (
                    <MenuItem key={uf._id} value={uf._id}>
                      {uf}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
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
                  {/* {cities.map((city) => (
                    <MenuItem key={city._id} value={city._id}>
                      {city.name}
                    </MenuItem>
                  ))} */}
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
            onClick={(e) => sendRequest(e)}
          >
            Cadastrar
          </Button>
          <Grid container justify="center">
            <a href={ROUTES.PEOPLE_MANAGEMENT}>
              <small>Gerenciar Pessoa</small>
            </a>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
