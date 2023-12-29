import { toast } from 'react-toast-notification';

const showToast = (message, type) => {
  if (message) {
    toast(message, {
      status: type === 'success' ? 'Successful' : 'Error',
      type: type,
      autoHide: true,
      delay: '5000'
    });
  }
};

const success = (message) => {
  showToast(message, 'success');
};

const error = (message) => {
  showToast(message, 'error');
};

export default { success, error };
