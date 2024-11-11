import * as Yup from 'yup';

export interface IPersonaQuizResponse {
  email: string; // The user's email, required field
  goal: string; // The user's goal, required field
  usage: string; // The user's intended usage, required field
  comfortLevel: string; // The user's comfort level, required field
  dataType: string; // The type of data the user is interested in, required field
  interaction: string; // How the user prefers to interact, required field
  assignedPersona: string; // The assigned persona based on quiz answers, required field
}

export const PersonaQuizSchema = Yup.object({
  goal: Yup.string().required('Goal is required'),
  usage: Yup.string().required('Usage is required'),
  comfortLevel: Yup.string().required('Comfort level is required'),
  dataType: Yup.string().required('Data type is required'),
  interaction: Yup.string().required('Interaction preference is required'),
});

export const EditDatasetSchema = Yup.object().shape({
  id: Yup.number().required(),
  name: Yup.string().required('Name is required'),
  url: Yup.string().url('URL is invalid').required('URL is required'),
  topic: Yup.string().required('Topic is required'),
  description: Yup.string().required('Description is required'),
  org: Yup.string().required('Organization is required'),
});
