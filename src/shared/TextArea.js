import { ErrorMessage, useField } from 'formik';
import Form from 'react-bootstrap/Form';

const TextArea = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group className="mb-3 mx-3 " controlId="ControlTextarea1">
        <Form.Control
          as="textarea"
          className={`p-3 mb-3 ${meta.touched && meta.error && 'is-invalid'} `}
          style={{
            resize: 'none',
            backgroundColor: '#F8F8F8',
            color: '#9B9B9B',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '100%'
          }}
          rows={9}
          {...field}
          {...props}
        />
        <ErrorMessage component="small" name={field.name} className="text-danger fw-bold" />
      </Form.Group>
    </>
  );
};

export default TextArea;
