export const usuariosEmptyValues = {
  name: '',
  email: '',
  access: 2,
  creation_date: null,
};

export const TextInputsFields = [
  {
    name: 'name',
    label: 'Nome',
    placeholder: 'Nome',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
  },
];

export const SelectInputsFields = [
  {
    name: 'access',
    label: 'Nível de acesso',
    helperText:
      'Esse campo irá definir as permissões que o usuário terá no sistema.',
    values: [
      { value: 2, name: 'Consulta' },
      { value: 1, name: 'Manutenção' },
      { value: -1, name: 'Administração' },
    ],
  },
];
