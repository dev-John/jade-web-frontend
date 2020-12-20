import React, { useState, useEffect } from 'react';
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
import { validateCPF, validateCNPJ } from '../helpers/utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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

  hidden: {
    display: 'none',
  },
}));

export default function PersonForm({
  getUfs,
  getCitiesByUf,
  ufs,
  cities,
  setPersonForm,
  createPerson,
  editPerson,
  isEditingPerson,
  personForm,
  setErrorMessage,
}) {
  const classes = useStyles();

  const [month, day, year] = new Date().toLocaleDateString().split('/');
  const date = year.concat('-').concat(month).concat('-').concat(day);

  const [selectedRadio, setSelectedRadio] = React.useState('a');
  const [docType, setDocType] = useState(CPF); // CPF or CNPJ
  const [isDocumentValid, setDocumentValid] = useState(false);

  useEffect(() => {
    getUfs();
  }, []);

  useEffect(() => {
    personForm.uf && getCitiesByUf(personForm.uf);
  }, [personForm.uf]);

  useEffect(() => {
    if (isEditingPerson) {
      console.log('personForm', personForm);
      const isPessoaFisica = personForm.type === 'fisica';
      setSelectedRadio(isPessoaFisica ? 'a' : 'b');
      setDocType(isPessoaFisica ? CPF : CNPJ);
      getCitiesByUf(personForm.uf);
    }
  }, [isEditingPerson]);

  const sendRequest = (e) => {
    e.preventDefault();
    let isCpfCnpjValid = false;

    setPersonForm({
      ...personForm,
      type: docType === CPF ? 'fisica' : 'juridica',
    });

    if (isDocumentValid) {
      isEditingPerson && personForm._id ? editPerson() : createPerson();
    } else {
      setErrorMessage(`O ${docType} não é valido`);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Criação de pessoa física/jurídica:
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
                        setDocumentValid(validateCPF(personForm.cpfCnpj));
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
                        setDocumentValid(validateCNPJ(personForm.cpfCnpj));
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
            <Grid
              item
              xs={12}
              sm={6}
              md={!isEditingPerson ? 4 : 6}
              lg={!isEditingPerson ? 4 : 6}
              xl={3}
            >
              <TextField
                autoComplete="name"
                name="name"
                value={personForm.name}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                onChange={(e) => setPersonForm({ ...personForm, name: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={!isEditingPerson ? 4 : 6}
              lg={!isEditingPerson ? 4 : 6}
              xl={3}
            >
              <TextField
                autoComplete="cpfCnpj"
                name="cpfCnpj"
                value={personForm.cpfCnpj}
                variant="outlined"
                required
                fullWidth
                id="cpfCnpj"
                label={docType === CPF ? 'CPF' : 'CNPJ'}
                onChange={(e) => {
                  setPersonForm({ ...personForm, cpfCnpj: e.target.value });
                  setDocumentValid(
                    docType === CPF ? validateCPF(e.target.value) : validateCNPJ(e.target.value)
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={!isEditingPerson ? 6 : 4} md={4} lg={4} xl={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">UF</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  name="uf"
                  value={personForm.uf}
                  id="uf"
                  label="UF"
                  autoComplete="uf"
                  onChange={(e) => setPersonForm({ ...personForm, uf: e.target.value })}
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
            <Grid item xs={12} sm={!isEditingPerson ? 6 : 4} md={4} lg={4} xl={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Cidade</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="Cidade"
                  name="city"
                  value={personForm.city}
                  autoComplete="city"
                  onChange={(e) => setPersonForm({ ...personForm, city: e.target.value })}
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

            {!isEditingPerson ? (
              <Grid xs={12} sm={6} md={4} lg={4} xl={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="date"
                  label="Data de Nascimento"
                  type="date"
                  id="date"
                  autoComplete="date"
                  style={{ marginTop: '8px', marginLeft: '8px', paddingRight: '15px' }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setPersonForm({ ...personForm, birthDate: e.target.value })}
                />
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={12} sm={!isEditingPerson ? 6 : 4} md={4} lg={4} xl={3}>
              <TextField
                autoComplete="phone"
                name="phone"
                value={personForm.phone}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Telefone"
                onChange={(e) => setPersonForm({ ...personForm, phone: e.target.value })}
              />
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
            Salvar
          </Button>
          <Grid container justify="center">
            <a href={ROUTES.PEOPLE_MANAGEMENT}>
              <small> Voltar a Tela de Lista de Pessoas</small>
            </a>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
