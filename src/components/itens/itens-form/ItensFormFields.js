export const itensEmptyValues = {
  name: '',
  item_id: '',
  description: '',
  tags: '',
  default_storage_location: '',
  location_blacklist: [],
  location_whitelist: [],
};

export const TextInputsFields = [
  {
    name: 'name',
    label: 'Nome',
    placeholder: 'Nome',
  },
  {
    name: 'item_id',
    label: 'Número de Patrimônio',
    placeholder: 'Número de Patrimônio',
  },
  {
    name: 'description',
    label: 'Descrição',
    placeholder: 'Descrição',
  },
  {
    name: 'default_storage_location',
    label: 'Local correto de armazenamento',
    placeholder: 'Local correto de armazenamento',
  },
];

export const MultipleTextInputsFields = [
  {
    name: 'tags',
    label: 'ID do dispositivo RFID',
    placeholder: 'IDs dos dispositivos RFID do item',
    helperText: 'Pressione enter para salvar um valor',
  },
  {
    name: 'location_blacklist',
    label: 'Alertar ao sair da sala:',
    placeholder: 'Nome da sala',
    helperText: 'Pressione enter para salvar um valor',
  },
  {
    name: 'location_whitelist',
    label: 'Não alertar ao sair da sala:',
    placeholder: 'Nome da sala',
    helperText: 'Pressione enter para salvar um valor',
  },
];
