import React, { useState } from 'react';
import Dropzone from '../Dropzone/Dropzone';
import styles from './CreateEventForm.module.css';
import { useCreateEvent } from '../../hooks/useCreateEvent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

const CreateEventForm = () => {
  const { createEvent, loading } = useCreateEvent();
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [formData, setFormData] = useState({
    title: '', location: '', date: null,
    type: '', description: '', image: null,
  });

  const handleChange = (key, value) => setFormData({ ...formData, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) data.append(key, key === 'date' ? val.toISOString() : val);
    });

    try {
      await createEvent(data);
      toast.success('Event successfully created! 🎉');
      setFormData({ title: '', location: '', date: null, type: 'general', description: '', image: null });
      setDropzoneKey((k) => k + 1);
    } catch (err) {
      toast.error('Oops! Something went wrong.');
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradientCircle} />
      <div className={styles.formWrapper}>
        <h2 className={styles.heading}>Create a New Event</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {['title', 'location'].map((field) => (
            <div key={field} className={styles.inputGroup}>
              <input
                type="text"
                id={field}
                value={formData[field]}
                required
                onChange={(e) => handleChange(field, e.target.value)}
                className={formData[field] ? styles.filled : ''}
              />
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            </div>
          ))}

          <div className={styles.inputGroup}>
            <DatePicker
              id="date"
              selected={formData.date}
              onChange={(date) => handleChange('date', date)}
              showTimeSelect
              minDate={new Date()}
              dateFormat="Pp"
              className={`${styles.datepicker} ${formData.date ? styles.filled : ''}`}
              required
            />
            <label htmlFor="date">Date & Time</label>
          </div>

          <div className={styles.inputGroup}>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className={styles.select}
            >
              <option defaultValue>Select event type</option>
              {['general', 'course', 'volunteering', 'sports', 'music', 'art and culture', 'food and drink', 'networking', 'online', 'kids and family'].map((type) => (
                <option key={type} value={type}>{type[0].toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>

          <Dropzone key={dropzoneKey} onFileSelect={(file) => handleChange('image', file)} />

          <div className={styles.inputGroup}>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className={formData.description ? styles.filled : ''}
            />
            <label>Description</label>
          </div>

          <button type="submit" disabled={loading} className="button button-gradient">
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
      <div className={styles.sideImage}>
        <img
          src="https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=3088&auto=format&fit=crop"
          alt="Fancy event lights"
        />
      </div>
    </div>
  );
};

export default CreateEventForm;
