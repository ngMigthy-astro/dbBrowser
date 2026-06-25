export interface DataFilter {
  value: string;
  label: string;
}

export const genders: DataFilter[] = [
  { value: '', label: 'Todos los géneros' },
  { value: 'Male', label: 'Masculino' },
  { value: 'Female', label: 'Femenino' },
  { value: 'Other', label: 'Otro' },
  { value: 'Unknown', label: 'Desconocido' },
];

export const races: DataFilter[] = [
  { value: '', label: 'Todas las razas' },
  { value: 'Saiyan', label: 'Saiyajin' },
  { value: 'Namekian', label: 'Namekiano' },
  { value: 'Human', label: 'Humano' },
  { value: 'Majin', label: 'Majin' },
  { value: 'Frieza Race', label: 'Raza Frieza' },
  { value: 'Angel', label: 'Ángel' },
];
