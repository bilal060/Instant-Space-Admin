import { Button, Image } from 'react-bootstrap';
import TextField from '../../../shared/TextField';
import { MdDeleteForever } from 'react-icons/md';

const WarehouseBookingDetail = ({ AreaIcon, fields, setFields }) => {
  const addField = () => {
    const newField = { id: fields.length + 1, value: '' };
    setFields([...fields, newField]);
  };

  const deleteField = (index) => {
    if (fields.length > 1) {
      const newFields = [...fields];
      newFields.splice(index, 1);
      setFields(newFields);
    } else {
      alert('At least one field is required.');
    }
  };

  const handleInputChange = (index, event, check) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    newFields[index].error = check;
    setFields(newFields);
  };

  return (
    <>
      <div className="mb-4">
        <TextField
          icon={
            <Image
              fluid
              className="field-icon"
              src={AreaIcon}
              loading="lazy"
              width={20}
              height={20}
            />
          }
          placeholder="Required Space"
          name="requiredSpace"
          type="number"
          min="0"
        />
      </div>

      <div className="mb-4">
        {fields.map((field, index) => (
          <div key={index} className="mb-4 d-flex justify-content-between gap-2">
            <div className={`w-100`}>
              <div className={`mb-3 field-container`}>
                <div className="d-flex align-items-center">
                  <Image
                    fluid
                    className="field-icon"
                    src={AreaIcon}
                    loading="lazy"
                    width={20}
                    height={20}
                  />

                  <input
                    className={`form-control custom-field shadow-none input-style ${
                      !field.value && 'is-invalid'
                    } `}
                    onBlur={(e) => !field.value && handleInputChange(index, e, true)}
                    placeholder="Add Item"
                    autoComplete="off"
                    value={field.value}
                    onChange={(e) => {
                      !field.value
                        ? handleInputChange(index, e, true)
                        : handleInputChange(index, e, false);
                    }}
                    name={`item${field.id}`}
                    type="text"
                  />
                </div>
              </div>
              {field.error && (
                <div className="text-danger fw-bold text-13 mt-2">This field is required</div>
              )}
            </div>
            {fields.length > 1 && (
              <Button className="btn btn-blue" onClick={() => deleteField(index)}>
                <MdDeleteForever />
              </Button>
            )}
          </div>
        ))}
        <div className="d-flex justify-content-end">
          <Button
            className="h-40px btn-primary rounded btn-blue btn btn-primary"
            onClick={addField}
            disabled={fields.length === 10}
            type="button">
            Add More
          </Button>
        </div>
      </div>
    </>
  );
};

export default WarehouseBookingDetail;
