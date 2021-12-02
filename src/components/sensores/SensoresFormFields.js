export const sensoresEmptyValues = {
  name: '',
  sensor_id: '',
  description: '',
  tag: '',
  types: [],
};

export const TextInputsFields = [
  {
    name: 'name',
    label: 'Nome',
    placeholder: 'Nome',
  },
  {
    name: 'tag',
    label: 'Número de Patrimônio',
    placeholder: 'Número de Patrimônio',
  },
  {
    name: 'description',
    label: 'Descrição',
    placeholder: 'Descrição',
  },
  {
    name: 'sensor_id',
    label: 'Código de identificação do sensor',
    placeholder: 'Código de identificação do sensor',
  },
];

export const MultipleTextInputsFields = [
  {
    name: 'types',
    label: 'Tipo do sensor',
    placeholder: 'Exemplo: "Bluetooth", "RFID", etc',
    helperText: 'Pressione ENTER para salvar um valor.',
  },
];
